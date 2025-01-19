const { prismaMock } = require("../db.connection.mock");
const adminQueries = require("../../../../database/queries/admin.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("Check exists admin", () => {
    it("should return true if user exists", async () => {
        prismaMock.admins.findFirst.mockResolvedValue({ adminID: 1 });
        const response = await adminQueries.checkExistsAdmin(1);
        expect(response).toBe(true);
    });

    it("should return false if user does not exist", async () => {
        prismaMock.admins.findFirst.mockResolvedValue(null);
        const response = await adminQueries.checkExistsAdmin(1);
        expect(response).toBe(false);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.admins.findFirst.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.admins.findFirst.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.admins.findFirst.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.admins.findFirst.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.admins.findFirst.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.admins.findFirst.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.admins.findFirst.mockRejectedValue(error);
        await expect(adminQueries.checkExistsAdmin(1)).rejects.toThrow(error);
    });
});
