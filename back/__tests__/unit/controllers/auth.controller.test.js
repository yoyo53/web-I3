const userQueries = require("../../../database/queries/user.queries");
const teacherQueries = require("../../../database/queries/teacher.queries");
const studentQueries = require("../../../database/queries/student.queries");
const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = require("../../../controllers/auth.controller");

jest.mock("../../../database/queries/user.queries");
jest.mock("../../../database/queries/teacher.queries");
jest.mock("../../../database/queries/student.queries");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Create user action", () => {
    it("should return 201 and user ID if user is a student", async () => {
        userQueries.checkExistsUser.mockResolvedValue(false);
        teacherQueries.checkExistsTeacherNumber.mockResolvedValue(false);
        hash.mockResolvedValue("hashed_password");
        teacherQueries.createTeacher.mockResolvedValue(1);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Teacher",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ userID: 1 });
    });

    it("should return 201 and user ID if user is a student", async () => {
        userQueries.checkExistsUser.mockResolvedValue(false);
        studentQueries.checkExistsStudentNumber.mockResolvedValue(false);
        hash.mockResolvedValue("hashed_password");
        studentQueries.createStudent.mockResolvedValue(1);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Student",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ userID: 1 });
    });

    it("should return 400 if email, firstname, lastname, account_number or account_type is not provided", async () => {
        const request = { body: { email: "john.doe@mail.com", firstname: "John", lastname: "Doe" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should return 409 if email is already taken", async () => {
        userQueries.checkExistsUser.mockResolvedValue(true);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Teacher",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.json).toHaveBeenCalledWith({ error: "email already taken" });
    });

    it("should return 409 if teacher number is already taken", async () => {
        userQueries.checkExistsUser.mockResolvedValue(false);
        teacherQueries.checkExistsTeacherNumber.mockResolvedValue(true);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Teacher",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.json).toHaveBeenCalledWith({ error: "teacher number already taken" });
    });

    it("should return 409 if student number is already taken", async () => {
        userQueries.checkExistsUser.mockResolvedValue(false);
        studentQueries.checkExistsStudentNumber.mockResolvedValue(true);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Student",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(409);
        expect(response.json).toHaveBeenCalledWith({ error: "student number already taken" });
    });

    it("should return 400 if account type is invalid", async () => {
        userQueries.checkExistsUser.mockResolvedValue(false);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Admin",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.createUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid account type" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        userQueries.checkExistsUser.mockRejectedValue(error);

        const request = {
            body: {
                account_number: 1,
                firstname: "John",
                lastname: "Doe",
                email: "john.doe@mail.com",
                account_type: "Teacher",
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(authController.createUserAction(request, response)).rejects.toThrow(error);
    });
});

describe("Login user action", () => {
    it("should return 200 and token if user is an admin and password is correct", async () => {
        userQueries.getUserByEmailwithPassword.mockResolvedValue({
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "hashed_password",
        });
        compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("token");
        userQueries.getUserTypeById.mockResolvedValue("Admin");

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ token: "token", user_type: "Admin" });
    });

    it("should return 200 and token if user is a teacher and password is correct", async () => {
        userQueries.getUserByEmailwithPassword.mockResolvedValue({
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "hashed_password",
        });
        compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("token");
        userQueries.getUserTypeById.mockResolvedValue("Teacher");

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ token: "token", user_type: "Teacher" });
    });

    it("should return 200 and token if user is a student and password is correct", async () => {
        userQueries.getUserByEmailwithPassword.mockResolvedValue({
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "hashed_password",
        });
        compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("token");
        userQueries.getUserTypeById.mockResolvedValue("Student");

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ token: "token", user_type: "Student" });
    });

    it("should return 400 if email or password is not provided", async () => {
        const request = { body: { email: "john.doe@mail.com" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should return 400 if user does not exist", async () => {
        userQueries.getUserByEmailwithPassword.mockResolvedValue(null);

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid email or password" });
    });

    it("should return 400 if password is incorrect", async () => {
        userQueries.getUserByEmailwithPassword.mockResolvedValue({
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "hashed_password",
        });
        compare.mockResolvedValue(false);

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(401);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid email or password" });
    });

    it("should return 500 if user is not an admin, teacher or student", async () => {
        userQueries.getUserByEmailwithPassword.mockResolvedValue({
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "hashed_password",
        });
        compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue("token");
        userQueries.getUserTypeById.mockResolvedValue(null);

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await authController.loginUserAction(request, response);

        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid user account" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        userQueries.getUserByEmailwithPassword.mockRejectedValue(error);

        const request = { body: { email: "john.doe@mail.com", password: "password" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(authController.loginUserAction(request, response)).rejects.toThrow(error);
    });
});

describe("Verify token action", () => {
    it("should return user type if token is valid", async () => {
        const request = { user_id: 1, user_type: "Admin" };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        authController.verifyTokenAction(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith({ user_type: "Admin" });
    });
});
