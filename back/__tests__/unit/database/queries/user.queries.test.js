const { prismaMock } = require("../db.connection.mock");
const userQueries = require("../../../../database/queries/user.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("Check exists user", () => {
    it("should return true if user exists", async () => {
        prismaMock.users.findFirst.mockResolvedValue({ userID: 1 });
        const response = await userQueries.checkExistsUser("john.doe@mail.com");
        expect(response).toBe(true);
    });

    it("should return false if user does not exist", async () => {
        prismaMock.users.findFirst.mockResolvedValue(null);
        const response = await userQueries.checkExistsUser("john.doe@mail.com");
        expect(response).toBe(false);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.users.findFirst.mockRejectedValue(error);
        await expect(userQueries.checkExistsUser("john.doe@mail.com")).rejects.toThrow(error);
    });
});

describe("Get user by email with password", () => {
    it("should return user with password if user exists", async () => {
        const user = {
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "password",
        };
        prismaMock.users.findUnique.mockResolvedValue(user);
        const response = await userQueries.getUserByEmailwithPassword("john.doe@mail.com");
        expect(response).toEqual(user);
    });

    it("should return null if user does not exist", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);
        const response = await userQueries.getUserByEmailwithPassword("john.doe@mail.com");
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.users.findUnique.mockRejectedValue(error);
        await expect(userQueries.getUserByEmailwithPassword("john.doe@mail.com")).rejects.toThrow(error);
    });
});

describe("Get user by id", () => {
    it("should return user if user exists", async () => {
        const user = { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" };
        prismaMock.users.findUnique.mockResolvedValue(user);
        const response = await userQueries.getUserById(1);
        expect(response).toEqual(user);
    });

    it("should return null if user does not exist", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);
        const response = await userQueries.getUserById(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(userQueries.getUserById(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(userQueries.getUserById(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(userQueries.getUserById(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(userQueries.getUserById(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(userQueries.getUserById(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(userQueries.getUserById(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.users.findUnique.mockRejectedValue(error);
        await expect(userQueries.getUserById(1)).rejects.toThrow(error);
    });
});

describe("Get user password by ID", () => {
    it("should return hashed password if user exists", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ hashed_password: "password" });
        const response = await userQueries.getUserPasswordById(1);
        expect(response).toEqual("password");
    });

    it("should return null if user does not exist", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);
        const response = await userQueries.getUserPasswordById(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.users.findUnique.mockRejectedValue(error);
        await expect(userQueries.getUserPasswordById(1)).rejects.toThrow(error);
    });
});

describe("Get user type by ID", () => {
    it("should return Admin if user is an admin", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ admin: { adminID: 1 }, teacher: null, student: null });
        const response = await userQueries.getUserTypeById(1);
        expect(response).toEqual("Admin");
    });

    it("should return Teacher if user is a teacher", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ admin: null, teacher: { teacherID: 1 }, student: null });
        const response = await userQueries.getUserTypeById(1);
        expect(response).toEqual("Teacher");
    });

    it("should return Student if user is a student", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ admin: null, teacher: null, student: { studentID: 1 } });
        const response = await userQueries.getUserTypeById(1);
        expect(response).toEqual("Student");
    });

    it("should return null if user is in multiple roles", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ admin: { adminID: 1 }, teacher: { teacherID: 1 }, student: null });
        const response = await userQueries.getUserTypeById(1);
        expect(response).toBeNull();
    });

    it("should return null if user is not an admin, teacher or student", async () => {
        prismaMock.users.findUnique.mockResolvedValue({ admin: null, teacher: null, student: null });
        const response = await userQueries.getUserTypeById(1);
        expect(response).toBeNull();
    });

    it("should return null if user does not exist", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);
        const response = await userQueries.getUserTypeById(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.users.findUnique.mockRejectedValue(error);
        await expect(userQueries.getUserTypeById(1)).rejects.toThrow(error);
    });
});
