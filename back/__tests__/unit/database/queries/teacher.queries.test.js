const { prismaMock } = require("../db.connection.mock");
const teacherQueries = require("../../../../database/queries/teacher.queries");

describe("Check exists teacher", () => {
    it("should return true if teacher exists", async () => {
        prismaMock.teachers.findFirst.mockResolvedValue({ teacherID: 1 });
        const response = await teacherQueries.checkExistsTeacher(1);
        expect(response).toBe(true);
    });

    it("should return false if teacher does not exist", async () => {
        prismaMock.teachers.findFirst.mockResolvedValue(null);
        const response = await teacherQueries.checkExistsTeacher(1);
        expect(response).toBe(false);
    });

    it("should return false if an error occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Error());
        const response = await teacherQueries.checkExistsTeacher(1);
        expect(response).toBe(false);
    });
});

describe("Check exists teacher number", () => {
    it("should return true if teacher number exists", async () => {
        prismaMock.teachers.findFirst.mockResolvedValue({ teacherID: 1 });
        const response = await teacherQueries.checkExistsTeacherNumber(1);
        expect(response).toBe(true);
    });

    it("should return false if teacher number does not exist", async () => {
        prismaMock.teachers.findFirst.mockResolvedValue(null);
        const response = await teacherQueries.checkExistsTeacherNumber(1);
        expect(response).toBe(false);
    });

    it("should return false if an error occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Error());
        const response = await teacherQueries.checkExistsTeacherNumber(1);
        expect(response).toBe(false);
    });
});

describe("Get user by teacher ID", () => {
    it("should return user if teacher ID exists", async () => {
        const teacher = {
            teacherID: 1,
            teacher_number: 1,
            user: { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" },
        };

        prismaMock.teachers.findUnique.mockResolvedValue(teacher);
        const response = await teacherQueries.getUserByTeacherID(1);
        expect(response).toEqual(teacher);
    });

    it("should return null if teacher ID does not exist", async () => {
        prismaMock.teachers.findUnique.mockResolvedValue(null);
        const response = await teacherQueries.getUserByTeacherID(1);
        expect(response).toBeNull();
    });

    it("should return null if an error occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(new Error());
        const response = await teacherQueries.getUserByTeacherID(1);
        expect(response).toBeNull();
    });
});

describe("Create teacher", () => {
    it("should create teacher and return teacherID if teacher does not exist", async () => {
        const teacher = { teacherID: 1 };

        prismaMock.teachers.create.mockResolvedValue(teacher);
        const response = await teacherQueries.createTeacher(1, 1);
        expect(response).toEqual(teacher.teacherID);
    });

    it("should return null if teacher does exist", async () => {
        prismaMock.teachers.create.mockResolvedValue(null);
        const response = await teacherQueries.createTeacher(1, 1);
        expect(response).toBeNull();
    });

    it("should return null if an error occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Error());
        const response = await teacherQueries.createTeacher(1, 1);
        expect(response).toBeNull();
    });
});
