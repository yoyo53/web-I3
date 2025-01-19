const jwt = require("jsonwebtoken");
const securityMiddleware = require("../../../middlewares/security");
const { prisma } = require("../../../database/db.connection");

require("dotenv").config();

const admin = {
    user: {
        userID: -1,
        firstname: "Admin",
        lastname: "Admin",
        email: "admin.admin@mail.com",
        hashed_password: "admin_password",
    },
};
const teacher = {
    teacher_number: -1,
    user: {
        userID: -2,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@mail.com",
        hashed_password: "teacher_password",
    },
};
const student = {
    student_number: -1,
    user: {
        userID: -3,
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@mail.com",
        hashed_password: "student_password",
    },
};

beforeAll(async () => {
    await prisma.admins.create({ data: { user: { create: admin.user } } });
    await prisma.teachers.create({ data: { teacher_number: teacher.teacher_number, user: { create: teacher.user } } });
    await prisma.students.create({ data: { student_number: student.student_number, user: { create: student.user } } });
});

afterAll(async () => {
    await prisma.users.deleteMany({
        where: { userID: { in: [admin.user.userID, teacher.user.userID, student.user.userID] } },
    });
    await prisma.$disconnect();
});

describe("Verify token", () => {
    it("should call next if the token is valid", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Admin", hashed_password: admin.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(request.user_id).toBe(admin.user.userID);
        expect(request.user_type).toBe("Admin");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 401 error if the user type is invalid", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Teacher", hashed_password: admin.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });

    it("should return a 401 error if the hashed password is invalid", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Admin", hashed_password: "invalid_password" },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });

    it("should return a 401 error if the token is invalid", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Admin", hashed_password: admin.user.hashed_password },
            "wrong key",
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });

    it("should return a 401 error if the token is missing", async () => {
        const request = { get: jest.fn().mockReturnValue("") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });

    it("should return a 401 error if the token is too short", async () => {
        const request = { get: jest.fn().mockReturnValue("Bearer ") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });

    it("should return a 401 error if the token is not a Bearer token", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Admin", hashed_password: admin.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(token) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });
});

describe("Verify admin token", () => {
    it("should call next if the token is valid and the user is an admin", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Admin", hashed_password: admin.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyAdminToken(request, response, next);
        expect(request.user_id).toBe(admin.user.userID);
        expect(request.user_type).toBe("Admin");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 403 error if the user is not an admin", async () => {
        const token = jwt.sign(
            { user_id: teacher.user.userID, user_type: "Teacher", hashed_password: teacher.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyAdminToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "not an admin" });
    });
});

describe("Verify teacher token", () => {
    it("should call next if the token is valid and the user is a teacher", async () => {
        const token = jwt.sign(
            { user_id: teacher.user.userID, user_type: "Teacher", hashed_password: teacher.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyTeacherToken(request, response, next);
        expect(request.user_id).toBe(teacher.user.userID);
        expect(request.user_type).toBe("Teacher");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 403 error if the user is not a teacher", async () => {
        const token = jwt.sign(
            { user_id: admin.user.userID, user_type: "Admin", hashed_password: admin.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyTeacherToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "not a teacher" });
    });
});

describe("Verify student token", () => {
    it("should call next if the token is valid and the user is a student", async () => {
        const token = jwt.sign(
            { user_id: student.user.userID, user_type: "Student", hashed_password: student.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyStudentToken(request, response, next);
        expect(request.user_id).toBe(student.user.userID);
        expect(request.user_type).toBe("Student");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 403 error if the user is not a student", async () => {
        const token = jwt.sign(
            { user_id: teacher.user.userID, user_type: "Teacher", hashed_password: teacher.user.hashed_password },
            process.env.SECRET_KEY,
            { expiresIn: "1h" },
        );
        const request = { get: jest.fn().mockReturnValue(`Bearer ${token}`) };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyStudentToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "not a student" });
    });
});
