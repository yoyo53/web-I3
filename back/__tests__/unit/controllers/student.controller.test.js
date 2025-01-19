const surveysQueries = require("../../../database/queries/surveys.queries");
const answersQueries = require("../../../database/queries/answers.queries");
const studentController = require("../../../controllers/student.controller");

jest.mock("../../../database/queries/surveys.queries");
jest.mock("../../../database/queries/answers.queries");

describe("Get student surveys", () => {
    it("should return 200 and student surveys", async () => {
        const surveys = [{ surveyID: 1, teacher: { firstname: "John", lastname: "Doe" }, subject: "Math", group: "A" }];
        surveysQueries.getSurveysByStudentID.mockResolvedValue(surveys);

        const request = { user_id: 1 };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.getStudentSurveys(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(surveys);
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getSurveysByStudentID.mockRejectedValue(error);

        const request = { user_id: 1 };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(studentController.getStudentSurveys(request, response)).rejects.toThrow(error);
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
                },
            ],
            teacher: { firstname: "John", lastname: "Doe" },
            subject: "Math",
            group: "A",
        };
        surveysQueries.getStudentSurveyByID.mockResolvedValue(survey);

        const request = { user_id: 1, params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(survey);
    });

    it("should return 404 if survey does not exist", async () => {
        surveysQueries.getStudentSurveyByID.mockResolvedValue(null);

        const request = { user_id: 1, params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: "survey not found" });
    });

    it("should return 400 if survey ID is invalid", async () => {
        const request = { user_id: 1, params: { id: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing survey ID" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getStudentSurveyByID.mockRejectedValue(error);

        const request = { user_id: 1, params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(studentController.getSurveyByID(request, response)).rejects.toThrow(error);
    });
});

describe("Answer survey", () => {
    it("should return 201 if answers are valid", async () => {
        const survey = {
            surveyID: 1,
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: "radio",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
                {
                    questionID: 2,
                    question_text: "Question 2",
                    question_type: "checkbox",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
                {
                    questionID: 3,
                    question_text: "Question 3",
                    question_type: "text",
                },
                {
                    questionID: 4,
                    question_text: "Question 4",
                    question_type: "score",
                },
            ],
            teacher: { firstname: "John", lastname: "Doe" },
            subject: "Math",
            group: "A",
        };
        surveysQueries.getStudentSurveyByID.mockResolvedValue(survey);
        answersQueries.answerSurvey.mockResolvedValue(1);

        const request = {
            user_id: 1,
            params: { id: "1" },
            body: { answers: { 1: ["Option 1"], 2: ["Option 1", "Option 2"], 3: ["Answer"], 4: ["5"] } },
        };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.answerSurvey(request, response);

        expect(response.json).toHaveBeenCalledWith({ answerID: 1 });
        expect(response.status).toHaveBeenCalledWith(201);
    });

    it("should return 400 if survey ID is invalid", async () => {
        const request = { user_id: 1, params: { id: "invalid" }, body: { answers: { 1: ["Option 1"] } } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.answerSurvey(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing survey ID" });
    });

    it("should return 400 if answers are invalid", async () => {
        const survey = {
            surveyID: 1,
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: "radio",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
        };
        surveysQueries.getStudentSurveyByID.mockResolvedValue(survey);

        const request = { user_id: 1, params: { id: "1" }, body: { answers: { 1: ["Invalid"] } } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.answerSurvey(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing answers" });
    });

    it("should return 400 if question type is invalid", async () => {
        const survey = {
            surveyID: 1,
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: "Invalid",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
        };
        surveysQueries.getStudentSurveyByID.mockResolvedValue(survey);

        const request = { user_id: 1, params: { id: "1" }, body: { answers: { 1: ["Option 1"] } } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.answerSurvey(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing answers" });
    });

    it("should return 400 if answers are missing", async () => {
        const survey = {
            surveyID: 1,
            questions: [
                {
                    questionID: 1,
                    question_text: "Question 1",
                    question_type: "radio",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
        };
        surveysQueries.getStudentSurveyByID.mockResolvedValue(survey);

        const request = { user_id: 1, params: { id: "1" }, body: {} };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.answerSurvey(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing required fields" });
    });

    it("should return 404 if survey does not exist", async () => {
        surveysQueries.getStudentSurveyByID.mockResolvedValue(null);

        const request = { user_id: 1, params: { id: "1" }, body: { answers: { 1: ["Option 1"] } } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await studentController.answerSurvey(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: "survey not found" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getStudentSurveyByID.mockRejectedValue(error);

        const request = { user_id: 1, params: { id: "1" }, body: { answers: { 1: ["Option 1"] } } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(studentController.answerSurvey(request, response)).rejects.toThrow(error);
    });
});
