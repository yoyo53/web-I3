const { prismaMock } = require("../db.connection.mock");
const studentQueries = require("../../../../database/queries/student.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("Check exists student number", () => {
    it("should return true if student number exists", async () => {
        prismaMock.students.findFirst.mockResolvedValue({ studentID: 1 });
        const response = await studentQueries.checkExistsStudentNumber(1);
        expect(response).toBe(true);
    });

    it("should return false if student number does not exist", async () => {
        prismaMock.students.findFirst.mockResolvedValue(null);
        const response = await studentQueries.checkExistsStudentNumber(1);
        expect(response).toBe(false);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.students.findFirst.mockRejectedValue(error);
        await expect(studentQueries.checkExistsStudentNumber(1)).rejects.toThrow(error);
    });
});

describe("Get user by student ID", () => {
    it("should return user if student ID exists", async () => {
        const student = {
            studentID: 1,
            student_number: 1,
            user: { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" },
        };

        prismaMock.students.findUnique.mockResolvedValue(student);
        const response = await studentQueries.getUserByStudentID(1);
        expect(response).toEqual(student);
    });

    it("should return null if student ID does not exist", async () => {
        prismaMock.students.findUnique.mockResolvedValue(null);
        const response = await studentQueries.getUserByStudentID(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.students.findUnique.mockRejectedValue(error);
        await expect(studentQueries.getUserByStudentID(1)).rejects.toThrow(error);
    });
});

describe("Create student", () => {
    it("should return the ID of the created student", async () => {
        const student = { studentID: 1 };

        prismaMock.students.create.mockResolvedValue(student);
        const response = await studentQueries.createStudent(1, 1);
        expect(response).toEqual(student.studentID);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.students.create.mockRejectedValue(error);
        await expect(studentQueries.createStudent(1, 1)).rejects.toThrow(error);
    });
});
