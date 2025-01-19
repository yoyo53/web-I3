const modulesQueries = require("../../../database/queries/modules.queries");
const templatesQueries = require("../../../database/queries/templates.queries");
const surveysQueries = require("../../../database/queries/surveys.queries");
const adminController = require("../../../controllers/admin.controller");

jest.mock("../../../database/queries/modules.queries");
jest.mock("../../../database/queries/templates.queries");
jest.mock("../../../database/queries/surveys.queries");

describe("Get all modules", () => {
    it("should return 200 and all modules", async () => {
        const modules = [{ moduleID: 1, teacher: { firstname: "John", lastname: "Doe" }, subject: "Math", group: "A" }];
        modulesQueries.getAllModules.mockResolvedValue(modules);

        const request = {};
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getAllModules(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(modules);
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        modulesQueries.getAllModules.mockRejectedValue(error);

        const request = {};
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.getAllModules(request, response)).rejects.toThrow(error);
    });
});

describe("Get all templates", () => {
    it("should return 200 and all templates", async () => {
        const templates = [{ templateID: 1, template_name: "Template 1" }];
        templatesQueries.getAllTemplates.mockResolvedValue(templates);

        const request = {};
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getAllTemplates(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(templates);
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        templatesQueries.getAllTemplates.mockRejectedValue(error);

        const request = {};
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.getAllTemplates(request, response)).rejects.toThrow(error);
    });
});

describe("Get template by ID", () => {
    it("should return 200 and template data", async () => {
        const template = {
            templateID: 1,
            template_name: "Template 1",
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: "radio",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
        };
        templatesQueries.getTemplateByID.mockResolvedValue(template);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getTemplateByID(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(template);
    });

    it("should return 404 if template does not exist", async () => {
        templatesQueries.getTemplateByID.mockResolvedValue(null);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getTemplateByID(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: "template not found" });
    });

    it("should return 400 if template ID is invalid", async () => {
        const request = { params: { id: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getTemplateByID(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing template ID" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        templatesQueries.getTemplateByID.mockRejectedValue(error);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.getTemplateByID(request, response)).rejects.toThrow(error);
    });
});

describe("Create template", () => {
    it("should return 201 and template ID", async () => {
        const templateID = 1;
        templatesQueries.createTemplate.mockResolvedValue(templateID);

        const request = {
            body: {
                name: "Template 1",
                questions: [
                    {
                        question_text: "Question 1",
                        question_type: "radio",
                        options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                    },
                ],
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createTemplate(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ templateID: templateID });
    });

    it("should return 400 if required fields are missing", async () => {
        const request = { body: { name: "Template 1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createTemplate(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        templatesQueries.createTemplate.mockRejectedValue(error);

        const request = { body: { name: "Template 1", questions: [] } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.createTemplate(request, response)).rejects.toThrow(error);
    });
});

describe("Delete template by ID", () => {
    it("should return 204", async () => {
        templatesQueries.deleteTemplateByID.mockResolvedValue(1);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), end: jest.fn() };
        await adminController.deleteTemplateByID(request, response);

        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.end).toHaveBeenCalled();
    });

    it("should return 400 if template ID is invalid", async () => {
        const request = { params: { id: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.deleteTemplateByID(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing template ID" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        templatesQueries.deleteTemplateByID.mockRejectedValue(error);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.deleteTemplateByID(request, response)).rejects.toThrow(error);
    });
});

describe("Get all surveys", () => {
    it("should return 200 and all surveys", async () => {
        const surveys = [{ surveyID: 1, teacher: { firstname: "John", lastname: "Doe" }, subject: "Math", group: "A" }];
        surveysQueries.getAllSurveys.mockResolvedValue(surveys);

        const request = {};
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getAdminSurveys(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(surveys);
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getAllSurveys.mockRejectedValue(error);

        const request = {};
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.getAdminSurveys(request, response)).rejects.toThrow(error);
    });
});

describe("Get survey by ID", () => {
    it("should return 200 and survey data", async () => {
        const survey = {
            surveyID: 1,
            template_name: "Template 1",
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: "radio",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                    answers: [{ answer_text: "Option 1", student: { firstname: "Jane", lastname: "Doe" } }],
                },
            ],
            teacher: { firstname: "John", lastname: "Doe" },
            subject: "Math",
            group: "A",
        };
        surveysQueries.getAdminSurveyByID.mockResolvedValue(survey);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(survey);
    });

    it("should return 404 if survey does not exist", async () => {
        surveysQueries.getAdminSurveyByID.mockResolvedValue(null);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: "survey not found" });
    });

    it("should return 400 if survey ID is invalid", async () => {
        const request = { params: { id: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing survey ID" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getAdminSurveyByID.mockRejectedValue(error);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.getSurveyByID(request, response)).rejects.toThrow(error);
    });
});

describe("Create survey from template", () => {
    it("should return 201 and survey ID", async () => {
        surveysQueries.createSurvey.mockResolvedValue(1);

        const request = { body: { moduleID: 1, templateID: 1 } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createSurveyFromTemplate(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ surveyID: 1 });
    });

    it("should return 400 if module ID is invalid", async () => {
        const request = { body: { moduleID: "invalid", templateID: 1 } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createSurveyFromTemplate(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should return 400 if template ID is invalid", async () => {
        const request = { body: { moduleID: 1, templateID: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createSurveyFromTemplate(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.createSurvey.mockRejectedValue(error);

        const request = { body: { moduleID: 1, templateID: 1 } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.createSurveyFromTemplate(request, response)).rejects.toThrow(error);
    });
});

describe("Create survey from nothing", () => {
    it("should return 201 and survey ID", async () => {
        const templateID = 1;
        templatesQueries.createTemplate.mockResolvedValue(templateID);
        surveysQueries.createSurvey.mockResolvedValue(1);

        const request = {
            body: {
                name: "Template 1",
                questions: [
                    {
                        question_text: "Question 1",
                        question_type: "radio",
                        options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                    },
                ],
                moduleID: 1,
            },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createSurveyFromNothing(request, response);

        expect(response.status).toHaveBeenCalledWith(201);
        expect(response.json).toHaveBeenCalledWith({ surveyID: 1 });
    });

    it("should return 400 if required fields are missing", async () => {
        const request = { body: { name: "Template 1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.createSurveyFromNothing(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        templatesQueries.createTemplate.mockRejectedValue(error);

        const request = { body: { name: "Template 1", questions: [], moduleID: 1 } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.createSurveyFromNothing(request, response)).rejects.toThrow(error);
    });
});

describe("Delete survey by ID", () => {
    it("should return 204", async () => {
        surveysQueries.deleteSurveyByID.mockResolvedValue(1);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), end: jest.fn() };
        await adminController.deleteSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(204);
        expect(response.end).toHaveBeenCalled();
    });

    it("should return 400 if survey ID is invalid", async () => {
        const request = { params: { id: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await adminController.deleteSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing survey ID" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.deleteSurveyByID.mockRejectedValue(error);

        const request = { params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(adminController.deleteSurveyByID(request, response)).rejects.toThrow(error);
    });
});
