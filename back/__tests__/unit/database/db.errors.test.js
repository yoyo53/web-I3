const { DatabaseError, ConnectionError, ValidationError, handleErrors } = require("../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("handleErrors", () => {
    it("should return the result of the function if no error occurs", async () => {
        const result = await handleErrors(async () => "result");
        expect(result).toBe("result");
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        await expect(
            handleErrors(async () => {
                throw new Prisma.PrismaClientInitializationError();
            }),
        ).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        await expect(
            handleErrors(async () => {
                throw new Prisma.PrismaClientRustPanicError();
            }),
        ).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        await expect(
            handleErrors(async () => {
                throw new Prisma.PrismaClientValidationError("", {});
            }),
        ).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        await expect(
            handleErrors(async () => {
                throw new Prisma.PrismaClientKnownRequestError("", { code: "P2025" });
            }),
        ).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        await expect(
            handleErrors(async () => {
                throw new Prisma.PrismaClientKnownRequestError("", {});
            }),
        ).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        await expect(
            handleErrors(async () => {
                throw new Prisma.PrismaClientUnknownRequestError("", {});
            }),
        ).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        await expect(
            handleErrors(async () => {
                throw error;
            }),
        ).rejects.toThrow(error);
    });
});
