const { prisma } = require("../../../../database/db.connection");
const templatesQueries = require("../../../../database/queries/templates.queries");

beforeEach(async () => {
    await prisma.survey_templates.create({
        data: {
            survey_templateID: -1,
            name: "Template 1",
        },
    });
    await prisma.question_types.create({
        data: {
            question_typeID: -1,
            question_type: "Type 1",
        },
    });
    await prisma.questions.createMany({
        data: {
            questionID: -1,
            question_text: "Question 1",
            question_typeID: -1,
            survey_templateID: -1,
        },
    });
    await prisma.options.createMany({
        data: [
            { optionID: -1, option_text: "Option 1", questionID: -1 },
            { optionID: -2, option_text: "Option 2", questionID: -1 },
        ],
    });
});

afterEach(async () => {
    await prisma.question_types.delete({ where: { question_typeID: -1 } });
    await prisma.survey_templates.delete({ where: { survey_templateID: -1 } }).catch(() => {});
    await prisma.survey_templates.delete({ where: { survey_templateID: -2 } }).catch(() => {});
});

describe("Get all templates", () => {
    it("should return all modules", async () => {
        const response = await templatesQueries.getAllTemplates();
        expect(response).toEqual(
            expect.arrayContaining([
                {
                    templateID: -1,
                    name: "Template 1",
                },
            ]),
        );
    });
});

describe("Get template by ID", () => {
    it("should return the template data", async () => {
        const response = await templatesQueries.getTemplateByID(-1);
        expect(response).toEqual({
            templateID: -1,
            name: "Template 1",
            questions: [
                {
                    question_text: "Question 1",
                    question_type: "Type 1",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
        });
    });

    it("should return null if the template does not exist", async () => {
        const response = await templatesQueries.getTemplateByID(-2);
        expect(response).toBeNull();
    });
});

describe("Create template", () => {
    it("should return the ID of the created template", async () => {
        const response = await templatesQueries.createTemplate("Template 2", [
            {
                question_text: "Question 2",
                question_type: "Type 1",
                options: [{ option_text: "Option 3" }],
            },
        ]);
        expect(response).toEqual(expect.any(Number));
    });
});

describe("Delete template", () => {
    it("should return the ID of the deleted template", async () => {
        const response = await templatesQueries.deleteTemplateByID(-1);
        expect(response).toBe(-1);
    });
});
