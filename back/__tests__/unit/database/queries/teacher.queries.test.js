const { prismaMock } = require("../db.connection.mock");
const teacherQueries = require("../../../../database/queries/teacher.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

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

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.teachers.findFirst.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.teachers.findFirst.mockRejectedValue(error);
        await expect(teacherQueries.checkExistsTeacherNumber(1)).rejects.toThrow(error);
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

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.teachers.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.teachers.findUnique.mockRejectedValue(error);
        await expect(teacherQueries.getUserByTeacherID(1)).rejects.toThrow(error);
    });
});

describe("Create teacher", () => {
    it("should return the ID of the created teacher", async () => {
        const teacher = { teacherID: 1 };

        prismaMock.teachers.create.mockResolvedValue(teacher);
        const response = await teacherQueries.createTeacher(1, 1);
        expect(response).toEqual(teacher.teacherID);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.teachers.create.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.teachers.create.mockRejectedValue(error);
        await expect(teacherQueries.createTeacher(1, 1)).rejects.toThrow(error);
    });
});
