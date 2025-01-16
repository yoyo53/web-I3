const request = require("supertest");
const express = require("express");
const adminRoutes = require("../../../routes/admin.routes");
const adminController = require("../../../controllers/admin.controller");

const app = express();
app.use(express.json());
app.use("/admin", adminRoutes);

jest.mock("../../../controllers/admin.controller");

describe("admin routes", () => {
    describe("GET /admin/surveys", () => {
        it("should return all surveys", async () => {
            const mockSurveys = [{ surveyID: 1, name: "Survey 1" }];
            adminController.getAdminSurveys.mockImplementation((req, res) => res.status(200).json(mockSurveys));

            const response = await request(app).get("/admin/surveys");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.getAdminSurveys.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching surveys"),
            );

            const response = await request(app).get("/admin/surveys");
            expect(response.status).toBe(500);
        });
    });

    describe("GET /admin/surveys/:id", () => {
        it("should return a survey by ID", async () => {
            const mockSurvey = { surveyID: 1, name: "Survey 1" };
            adminController.getSurveyByID.mockImplementation((req, res) => res.status(200).json(mockSurvey));

            const response = await request(app).get("/admin/surveys/1");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.getSurveyByID.mockImplementation((req, res) => res.status(500).send("Error"));

            const response = await request(app).get("/admin/surveys/1");
            expect(response.status).toBe(500);
        });
    });

    describe("DELETE /admin/surveys/:id", () => {
        it("should delete a survey by ID", async () => {
            adminController.deleteSurveyByID.mockImplementation((req, res) =>
                res.status(200).json({ message: "Survey deleted successfully" }),
            );

            const response = await request(app).delete("/admin/surveys/1");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.deleteSurveyByID.mockImplementation((req, res) => res.status(500).send("Error"));

            const response = await request(app).delete("/admin/surveys/1");
            expect(response.status).toBe(500);
        });
    });

    describe("GET /admin/templates", () => {
        it("should return all survey templates", async () => {
            const mockTemplates = [{ templateID: 1, name: "Template 1" }];
            adminController.getAllTemplates.mockImplementation((req, res) => res.status(200).json(mockTemplates));

            const response = await request(app).get("/admin/templates");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.getAllTemplates.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching templates"),
            );

            const response = await request(app).get("/admin/templates");
            expect(response.status).toBe(500);
        });
    });

    describe("POST /admin/templates/create", () => {
        it("should create a new survey template", async () => {
            const mockTemplate = { templateID: 1, name: "Template 1" };
            adminController.createTemplate.mockImplementation((req, res) => res.status(200).json(mockTemplate));

            const response = await request(app)
                .post("/admin/templates/create")
                .send({ name: "Template 1", questions: [] });
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.createTemplate.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching templates"),
            );

            const response = await request(app)
                .post("/admin/templates/create")
                .send({ name: "Template 1", questions: [] });
            expect(response.status).toBe(500);
        });
    });

    describe("GET /admin/templates/:id", () => {
        it("should return a survey template by ID", async () => {
            const mockTemplate = { templateID: 1, name: "Template 1" };
            adminController.getTemplateByID.mockImplementation((req, res) => res.status(200).json(mockTemplate));

            const response = await request(app).get("/admin/templates/1");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.getTemplateByID.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching this template"),
            );

            const response = await request(app).get("/admin/templates/1");
            expect(response.status).toBe(500);
        });
    });

    describe("GET /admin/modules", () => {
        it("should return all modules", async () => {
            const mockModules = [{ moduleID: 1, name: "Module 1" }];
            adminController.getAllModules.mockImplementation((req, res) => res.status(200).json(mockModules));

            const response = await request(app).get("/admin/modules");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.getAllModules.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching this module"),
            );

            const response = await request(app).get("/admin/modules");
            expect(response.status).toBe(500);
        });
    });

    describe("POST /admin/surveys/create", () => {
        it("should create a survey from a template", async () => {
            const mockSurvey = { surveyID: 1, name: "Survey 1" };
            adminController.createSurveyFromTemplate.mockImplementation((req, res) => res.status(200).json(mockSurvey));

            const response = await request(app)
                .post("/admin/surveys/create")
                .send({ moduleID: 1, survey_templateID: 1 });
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.createSurveyFromTemplate.mockImplementation((req, res) => res.status(500).send("Error"));

            const response = await request(app)
                .post("/admin/surveys/create")
                .send({ moduleID: 1, survey_templateID: 1 });
            expect(response.status).toBe(500);
        });
    });

    describe("POST /admin/surveys/create/custom", () => {
        it("should create a survey from scratch", async () => {
            const mockSurvey = { surveyID: 1, name: "Survey 1" };
            adminController.createSurveyFromNothing.mockImplementation((req, res) => res.status(200).json(mockSurvey));

            const response = await request(app)
                .post("/admin/surveys/create/custom")
                .send({ name: "Survey 1", moduleID: 1, questions: [] });
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.createSurveyFromNothing.mockImplementation((req, res) => res.status(500).send("Error"));

            const response = await request(app)
                .post("/admin/surveys/create/custom")
                .send({ name: "Survey 1", moduleID: 1, questions: [] });
            expect(response.status).toBe(500);
        });
    });

    describe("DELETE /admin/templates/:id", () => {
        it("should delete a template by ID", async () => {
            adminController.deleteTemplateByID.mockImplementation((req, res) =>
                res.status(200).json({ message: "Template deleted successfully" }),
            );

            const response = await request(app).delete("/admin/templates/1");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            adminController.deleteTemplateByID.mockImplementation((req, res) => res.status(500).send("Error"));

            const response = await request(app).delete("/admin/templates/1");
            expect(response.status).toBe(500);
        });
    });
});
