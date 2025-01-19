const userQueries = require("../../../database/queries/user.queries");
const teacherQueries = require("../../../database/queries/teacher.queries");
const studentQueries = require("../../../database/queries/student.queries");
const userController = require("../../../controllers/user.controller");

jest.mock("../../../database/queries/user.queries");
jest.mock("../../../database/queries/teacher.queries");
jest.mock("../../../database/queries/student.queries");

describe("Get user data", () => {
    describe("User type is Admin", () => {
        it("should return 200 and admin data", async () => {
            const user = { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" };
            userQueries.getUserById.mockResolvedValue(user);

            const request = { user_id: 1, user_type: "Admin" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            });
        });

        it("should return 500 if user does not exist", async () => {
            userQueries.getUserById.mockResolvedValue(null);

            const request = { user_id: 1, user_type: "Admin" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({ error: "invalid user account" });
        });

        it("should throw the error if an error occurs", async () => {
            const error = new Error();
            userQueries.getUserById.mockRejectedValue(error);

            const request = { user_id: 1, user_type: "Admin" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await expect(userController.getUserData(request, response)).rejects.toThrow(error);
        });
    });

    describe("User type is Teacher", () => {
        it("should return 200 and teacher data", async () => {
            const teacher = {
                teacherID: 1,
                teacher_number: 1,
                user: { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" },
            };
            teacherQueries.getUserByTeacherID.mockResolvedValue(teacher);

            const request = { user_id: 1, user_type: "Teacher" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                id: teacher.teacher_number,
                firstname: teacher.user.firstname,
                lastname: teacher.user.lastname,
                email: teacher.user.email,
            });
        });

        it("should return 500 if teacher does not exist", async () => {
            teacherQueries.getUserByTeacherID.mockResolvedValue(null);

            const request = { user_id: 1, user_type: "Teacher" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({ error: "invalid user account" });
        });

        it("should throw the error if an error occurs", async () => {
            const error = new Error();
            teacherQueries.getUserByTeacherID.mockRejectedValue(error);

            const request = { user_id: 1, user_type: "Teacher" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await expect(userController.getUserData(request, response)).rejects.toThrow(error);
        });
    });

    describe("User type is Student", () => {
        it("should return 200 and student data", async () => {
            const student = {
                studentID: 1,
                student_number: 1,
                user: { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" },
            };
            studentQueries.getUserByStudentID.mockResolvedValue(student);

            const request = { user_id: 1, user_type: "Student" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                id: student.student_number,
                firstname: student.user.firstname,
                lastname: student.user.lastname,
                email: student.user.email,
            });
        });

        it("should return 500 if student does not exist", async () => {
            studentQueries.getUserByStudentID.mockResolvedValue(null);

            const request = { user_id: 1, user_type: "Student" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({ error: "invalid user account" });
        });

        it("should throw the error if an error occurs", async () => {
            const error = new Error();
            studentQueries.getUserByStudentID.mockRejectedValue(error);

            const request = { user_id: 1, user_type: "Student" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await expect(userController.getUserData(request, response)).rejects.toThrow(error);
        });
    });

    describe("User type is unknown", () => {
        it("should return 500 if user type is unknown", async () => {
            const request = { user_id: 1, user_type: "Unknown" };
            const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            await userController.getUserData(request, response);

            expect(response.status).toHaveBeenCalledWith(500);
            expect(response.json).toHaveBeenCalledWith({ error: "invalid user account" });
        });
    });
});
