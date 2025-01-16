const { prismaMock } = require("../db.connection.mock");
const surveysQueries = require("../../../../database/queries/surveys.queries");

describe("Check All surveys", () => {
    it("should return all surveys", async () => {
        const surveys = [
            {
                surveyID: 1,
                module: {
                    subject: { name: "Mathematics" },
                    group: { name: "SE1" },
                    teacher: { user: { lastname: "Doe", firstname: "John" } },
                },
            },
            {
                surveyID: 2,
                module: {
                    subject: { name: "Physics" },
                    group: { name: "SE2" },
                    teacher: { user: { lastname: "Smith", firstname: "John" } },
                },
            },
        ];
        prismaMock.surveys.findMany.mockResolvedValue(surveys);
        const response = await surveysQueries.getAllSurveys();
        expect(response).toEqual(
            surveys.map((survey) => ({
                surveyID: survey.surveyID,
                teacher: {
                    firstname: survey.module.teacher.user.firstname,
                    lastname: survey.module.teacher.user.lastname,
                },
                subject: survey.module.subject.name,
                group: survey.module.group.name,
            })),
        );
    });

    it("should return empty list if no surveys", async () => {
        prismaMock.surveys.findMany.mockResolvedValue([]);
        const response = await surveysQueries.getAllSurveys();
        expect(response).toEqual([]);
    });

    it("should return null if an error occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Error());
        const response = await surveysQueries.getAllSurveys();
        expect(response).toBeNull();
    });
});
