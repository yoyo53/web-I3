const jwt = require("jsonwebtoken");
const securityMiddleware = require("../../../middlewares/security");

jest.mock("jsonwebtoken");

describe("Verify token", () => {
    it("should call next if the token is valid", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Admin" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(request.user_id).toBe(1);
        expect(request.user_type).toBe("Admin");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 401 error if the token is invalid", async () => {
        jwt.verify.mockImplementation(() => {
            throw new Error();
        });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
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
        const request = { get: jest.fn().mockReturnValue("token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid token" });
    });
});

describe("Verify admin token", () => {
    it("should call next if the token is valid and the user is an admin", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Admin" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyAdminToken(request, response, next);
        expect(request.user_id).toBe(1);
        expect(request.user_type).toBe("Admin");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 403 error if the user is not an admin", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Teacher" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyAdminToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "not an admin" });
    });
});

describe("Verify teacher token", () => {
    it("should call next if the token is valid and the user is a teacher", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Teacher" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyTeacherToken(request, response, next);
        expect(request.user_id).toBe(1);
        expect(request.user_type).toBe("Teacher");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 403 error if the user is not a teacher", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Student" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyTeacherToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "not a teacher" });
    });
});

describe("Verify student token", () => {
    it("should call next if the token is valid and the user is a student", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Student" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyStudentToken(request, response, next);
        expect(request.user_id).toBe(1);
        expect(request.user_type).toBe("Student");
        expect(next).toHaveBeenCalled();
    });

    it("should return a 403 error if the user is not a student", async () => {
        jwt.verify.mockReturnValue({ user_id: 1, user_type: "Teacher" });
        const request = { get: jest.fn().mockReturnValue("Bearer token") };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        await securityMiddleware.verifyStudentToken(request, response, next);
        expect(response.status).toHaveBeenCalledWith(403);
        expect(response.json).toHaveBeenCalledWith({ error: "not a student" });
    });
});
