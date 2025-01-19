const surveysQueries = require("../../../database/queries/surveys.queries");
const teacherController = require("../../../controllers/teacher.controller");

jest.mock("../../../database/queries/surveys.queries");

describe("Get teacher surveys", () => {
    it("should return 200 and teacher surveys", async () => {
        const surveys = [{ surveyID: 1, teacher: { firstname: "John", lastname: "Doe" }, subject: "Math", group: "A" }];
        surveysQueries.getSurveysByTeacherID.mockResolvedValue(surveys);

        const request = { user_id: 1 };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await teacherController.getTeacherSurveys(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(surveys);
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getSurveysByTeacherID.mockRejectedValue(error);

        const request = { user_id: 1 };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(teacherController.getTeacherSurveys(request, response)).rejects.toThrow(error);
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
                    answers: [{ answer_text: "Option 1" }],
                },
            ],
            teacher: { firstname: "John", lastname: "Doe" },
            subject: "Math",
            group: "A",
        };
        surveysQueries.getTeacherSurveyByID.mockResolvedValue(survey);

        const request = { user_id: 1, params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await teacherController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(survey);
    });

    it("should return 404 if survey does not exist", async () => {
        surveysQueries.getTeacherSurveyByID.mockResolvedValue(null);

        const request = { user_id: 1, params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await teacherController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(404);
        expect(response.json).toHaveBeenCalledWith({ error: "survey not found" });
    });

    it("should return 400 if survey ID is invalid", async () => {
        const request = { user_id: 1, params: { id: "invalid" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await teacherController.getSurveyByID(request, response);

        expect(response.status).toHaveBeenCalledWith(400);
        expect(response.json).toHaveBeenCalledWith({ error: "invalid or missing survey ID" });
    });

    it("should throw the error if an error occurs", async () => {
        const error = new Error();
        surveysQueries.getTeacherSurveyByID.mockRejectedValue(error);

        const request = { user_id: 1, params: { id: "1" } };
        const response = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await expect(teacherController.getSurveyByID(request, response)).rejects.toThrow(error);
    });
});
