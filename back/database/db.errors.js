const { Prisma } = require("@prisma/client");

class DatabaseError extends Error {
    constructor(message) {
        super(message);
        this.name = "DatabaseError";
    }
}

class ConnectionError extends DatabaseError {
    constructor(message) {
        super(message);
        this.name = "ConnectionError";
    }
}

class ValidationError extends DatabaseError {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

async function handleErrors(callback) {
    try {
        return await callback();
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientInitializationError ||
            error instanceof Prisma.PrismaClientRustPanicError
        ) {
            throw new ConnectionError("Database connection failed");
        } else if (error instanceof Prisma.PrismaClientValidationError || error.code === "P2025") {
            throw new ValidationError("Invalid data");
        } else if (
            error instanceof Prisma.PrismaClientKnownRequestError ||
            error instanceof Prisma.PrismaClientUnknownRequestError
        ) {
            throw new DatabaseError("Database error");
        }
        throw error;
    }
}

module.exports = {
    DatabaseError,
    ConnectionError,
    ValidationError,
    handleErrors,
};
