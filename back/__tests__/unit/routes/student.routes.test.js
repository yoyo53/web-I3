const request = require("supertest");
const express = require("express");
const studentRoutes = require("../../../routes/student.routes");
const studentController = require("../../../controllers/student.controller");
const securityMiddleware = require("../../../middlewares/security");

const app = express();
app.use(express.json());
app.use("/student", studentRoutes);

jest.mock("../../../controllers/student.controller");
jest.mock("../../../middlewares/security");

describe("student routes", () => {
    beforeEach(() => {
        securityMiddleware.verifyToken.mockImplementation((req, res, next) => {
            req.user_id = 1;
            req.user_type = "Student";
            next();
        });
    });

    describe("GET /student/surveys", () => {
        it("should return all surveys for a student", async () => {
            const mockSurveys = [
                { surveyID: 1, subject: "Math", group: "A", teacher: { firstname: "John", lastname: "Doe" } },
            ];
            studentController.getStudentSurveys.mockImplementation((req, res) => res.status(200).json(mockSurveys));

            const response = await request(app).get("/student/surveys");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            studentController.getStudentSurveys.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching surveys"),
            );

            const response = await request(app).get("/student/surveys");
            expect(response.status).toBe(500);
        });
    });

    describe("GET /student/surveys/:id", () => {
        it("should return a specific survey by ID", async () => {
            const mockSurvey = {
                surveyID: 1,
                subject: "Math",
                group: "A",
                teacher: { firstname: "John", lastname: "Doe" },
            };
            studentController.getSurveyByID.mockImplementation((req, res) => res.status(200).json(mockSurvey));

            const response = await request(app).get("/student/surveys/1");
            expect(response.status).toBe(200);
        });

        it("should return 500 if there is an error", async () => {
            studentController.getSurveyByID.mockImplementation((req, res) =>
                res.status(500).send("Error while fetching survey"),
            );

            const response = await request(app).get("/student/surveys/1");
            expect(response.status).toBe(500);
        });
    });

    describe("POST /student/surveys/:id/answer", () => {
        it("should submit answers to a survey", async () => {
            studentController.answerSurvey.mockImplementation((req, res) =>
                res.status(200).json({ message: "Answers submitted successfully" }),
            );

            const response = await request(app)
                .post("/student/surveys/1/answer")
                .send({ answers: [{ questionID: 1, answer_text: "Answer" }] });
            expect(response.status).toBe(200);
        });

        it("should return 400 if required parameters are missing", async () => {
            studentController.answerSurvey.mockImplementation((req, res) =>
                res.status(400).json({ error: "Missing fields" }),
            );

            const response = await request(app).post("/student/surveys/1/answer").send({});
            expect(response.status).toBe(400);
        });

        it("should return 500 if there is an error", async () => {
            studentController.answerSurvey.mockImplementation((req, res) =>
                res.status(500).json({ error: "Error while answering survey" }),
            );

            const response = await request(app)
                .post("/student/surveys/1/answer")
                .send({ answers: [{ questionID: 1, answer_text: "Answer" }] });
            expect(response.status).toBe(500);
        });
    });
});
