const { prismaMock } = require("../db.connection.mock");
const answersQueries = require("../../../../database/queries/answers.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("Answer survey", () => {
    it("should return the ID of the created answer", async () => {
        prismaMock.survey_answers.create.mockResolvedValue({ survey_answerID: 1 });
        const response = await answersQueries.answerSurvey(1, 1, { 1: ["Answer 1"] });
        expect(response).toBe(1);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.survey_answers.create.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.survey_answers.create.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.survey_answers.create.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.survey_answers.create.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.survey_answers.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.survey_answers.create.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.survey_answers.create.mockRejectedValue(error);
        await expect(answersQueries.answerSurvey(1, 1, {})).rejects.toThrow(error);
    });
});
