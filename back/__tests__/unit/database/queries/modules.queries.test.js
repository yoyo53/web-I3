const { prismaMock } = require("../db.connection.mock");
const modulesQueries = require("../../../../database/queries/modules.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("Get all modules", () => {
    it("should return all modules if modules are found", async () => {
        const modules = [
            {
                moduleID: 1,
                teacher: { user: { firstname: "John", lastname: "Doe" } },
                subject: { name: "Math" },
                group: { name: "A" },
            },
            {
                moduleID: 2,
                teacher: { user: { firstname: "Jane", lastname: "Doe" } },
                subject: { name: "English" },
                group: { name: "B" },
            },
        ];

        prismaMock.modules.findMany.mockResolvedValue(modules);
        const response = await modulesQueries.getAllModules();
        expect(response).toEqual(
            modules.map((module) => ({
                moduleID: module.moduleID,
                teacher: { firstname: module.teacher.user.firstname, lastname: module.teacher.user.lastname },
                subject: module.subject.name,
                group: module.group.name,
            })),
        );
    });

    it("should return an empty array if no modules are found", async () => {
        prismaMock.modules.findMany.mockResolvedValue([]);
        const response = await modulesQueries.getAllModules();
        expect(response).toEqual([]);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.modules.findMany.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(modulesQueries.getAllModules()).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.modules.findMany.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(modulesQueries.getAllModules()).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.modules.findMany.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(modulesQueries.getAllModules()).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.modules.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(modulesQueries.getAllModules()).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.modules.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(modulesQueries.getAllModules()).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.modules.findMany.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(modulesQueries.getAllModules()).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.modules.findMany.mockRejectedValue(error);
        await expect(modulesQueries.getAllModules()).rejects.toThrow(error);
    });
});
