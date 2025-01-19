const { prismaMock } = require("../db.connection.mock");
const templatesQueries = require("../../../../database/queries/templates.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

describe("Get all templates", () => {
    it("should return all templates if templates are found", async () => {
        const templates = [
            { survey_templateID: 1, name: "Template 1" },
            { survey_templateID: 2, name: "Template 2" },
        ];

        prismaMock.survey_templates.findMany.mockResolvedValue(templates);
        const response = await templatesQueries.getAllTemplates();
        expect(response).toEqual(
            templates.map((template) => ({
                templateID: template.survey_templateID,
                name: template.name,
            })),
        );
    });

    it("should return an empty array if no templates are found", async () => {
        prismaMock.survey_templates.findMany.mockResolvedValue([]);
        const response = await templatesQueries.getAllTemplates();
        expect(response).toEqual([]);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.survey_templates.findMany.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.survey_templates.findMany.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.survey_templates.findMany.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.survey_templates.findMany.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.survey_templates.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.survey_templates.findMany.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.survey_templates.findMany.mockRejectedValue(error);
        await expect(templatesQueries.getAllTemplates()).rejects.toThrow(error);
    });
});

describe("Get template by ID", () => {
    it("should return template if template is found", async () => {
        const template = {
            survey_templateID: 1,
            name: "Template 1",
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: { question_type: "radio" },
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
        };
        prismaMock.survey_templates.findUnique.mockResolvedValue(template);
        const response = await templatesQueries.getTemplateByID(1);
        expect(response).toEqual({
            templateID: template.survey_templateID,
            name: template.name,
            questions: template.questions.map((question) => ({
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
            })),
        });
    });

    it("should return null if no template is found", async () => {
        prismaMock.survey_templates.findUnique.mockResolvedValue(null);
        const response = await templatesQueries.getTemplateByID(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.survey_templates.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.survey_templates.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.survey_templates.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.survey_templates.findUnique.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.survey_templates.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.survey_templates.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.survey_templates.findUnique.mockRejectedValue(error);
        await expect(templatesQueries.getTemplateByID(1)).rejects.toThrow(error);
    });
});

describe("Create template", () => {
    it("should return the ID of the created template", async () => {
        const questions = [
            {
                question_text: "Question 1",
                question_type: "radio",
                options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
            },
        ];
        prismaMock.survey_templates.create.mockResolvedValue({ survey_templateID: 1 });
        const response = await templatesQueries.createTemplate("Template 1", questions);
        expect(response).toBe(1);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.survey_templates.create.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.survey_templates.create.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.survey_templates.create.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.survey_templates.create.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.survey_templates.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.survey_templates.create.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.survey_templates.create.mockRejectedValue(error);
        await expect(templatesQueries.createTemplate("Template 1", [])).rejects.toThrow(error);
    });
});

describe("Delete template by ID", () => {
    it("should return the ID of the deleted template", async () => {
        prismaMock.survey_templates.delete.mockResolvedValue({ survey_templateID: 1 });
        const response = await templatesQueries.deleteTemplateByID(1);
        expect(response).toBe(1);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.survey_templates.delete.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.survey_templates.delete.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.survey_templates.delete.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.survey_templates.delete.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.survey_templates.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.survey_templates.delete.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.survey_templates.delete.mockRejectedValue(error);
        await expect(templatesQueries.deleteTemplateByID(1)).rejects.toThrow(error);
    });
});
