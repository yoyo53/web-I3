const { prismaMock } = require("../db.connection.mock");
const surveysQueries = require("../../../../database/queries/surveys.queries");
const { DatabaseError, ConnectionError, ValidationError } = require("../../../../database/db.errors");
const { Prisma } = require("@prisma/client");

/*
async function getAllSurveys
async function getSurveysByTeacherID
async function getSurveysByStudentID
async function getAdminSurveyByID
async function getTeacherSurveyByID
async function getStudentSurveyByID
async function createSurvey
async function deleteSurveyByID
*/

describe("Get all surveys", () => {
    it("should return all surveys if surveys are found", async () => {
        const surveys = [
            {
                surveyID: 1,
                module: {
                    teacher: { user: { firstname: "John", lastname: "Doe" } },
                    subject: { name: "Math" },
                    group: { name: "A" },
                },
            },
            {
                surveyID: 2,
                module: {
                    teacher: { user: { firstname: "Jane", lastname: "Doe" } },
                    subject: { name: "English" },
                    group: { name: "B" },
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

    it("should return an empty array if no surveys are found", async () => {
        prismaMock.surveys.findMany.mockResolvedValue([]);
        const response = await surveysQueries.getAllSurveys();
        expect(response).toEqual([]);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.findMany.mockRejectedValue(error);
        await expect(surveysQueries.getAllSurveys()).rejects.toThrow(error);
    });
});

describe("Get surveys by teacher ID", () => {
    it("should return all surveys if surveys are found", async () => {
        const surveys = [
            {
                surveyID: 1,
                module: {
                    teacher: { user: { firstname: "John", lastname: "Doe" } },
                    subject: { name: "Math" },
                    group: { name: "A" },
                },
            },
            {
                surveyID: 2,
                module: {
                    teacher: { user: { firstname: "Jane", lastname: "Doe" } },
                    subject: { name: "English" },
                    group: { name: "B" },
                },
            },
        ];

        prismaMock.surveys.findMany.mockResolvedValue(surveys);
        const response = await surveysQueries.getSurveysByTeacherID(1);
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

    it("should return an empty array if no surveys are found", async () => {
        prismaMock.surveys.findMany.mockResolvedValue([]);
        const response = await surveysQueries.getSurveysByTeacherID(1);
        expect(response).toEqual([]);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.findMany.mockRejectedValue(error);
        await expect(surveysQueries.getSurveysByTeacherID(1)).rejects.toThrow(error);
    });
});

describe("Get surveys by student ID", () => {
    it("should return all surveys if surveys are found", async () => {
        const surveys = [
            {
                surveyID: 1,
                module: {
                    teacher: { user: { firstname: "John", lastname: "Doe" } },
                    subject: { name: "Math" },
                    group: { name: "A" },
                },
            },
            {
                surveyID: 2,
                module: {
                    teacher: { user: { firstname: "Jane", lastname: "Doe" } },
                    subject: { name: "English" },
                    group: { name: "B" },
                },
            },
        ];

        prismaMock.surveys.findMany.mockResolvedValue(surveys);
        const response = await surveysQueries.getSurveysByStudentID(1);
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

    it("should return an empty array if no surveys are found", async () => {
        prismaMock.surveys.findMany.mockResolvedValue([]);
        const response = await surveysQueries.getSurveysByStudentID(1);
        expect(response).toEqual([]);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.findMany.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.findMany.mockRejectedValue(error);
        await expect(surveysQueries.getSurveysByStudentID(1)).rejects.toThrow(error);
    });
});

describe("Get admin survey by ID", () => {
    it("should return the survey if the survey is found", async () => {
        const survey = {
            surveyID: 1,
            survey_template: {
                name: "Survey 1",
                questions: [
                    {
                        questionID: 1,
                        question_text: "Question 1",
                        question_type: { question_type: "radio" },
                        options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                        answer_questions: [
                            {
                                answer_text: "Option 1",
                                survey_answer: {
                                    student: {
                                        user: { firstname: "Jane", lastname: "Doe" },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
            module: {
                teacher: {
                    user: { firstname: "John", lastname: "Doe" },
                },
                subject: { name: "Math" },
                group: { name: "A" },
            },
        };

        prismaMock.surveys.findUnique.mockResolvedValue(survey);
        const response = await surveysQueries.getAdminSurveyByID(1);
        expect(response).toEqual({
            surveyID: survey.surveyID,
            template_name: survey.survey_template.name,
            questions: survey.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
                answers: question.answer_questions.map((answer) => ({
                    answer_text: answer.answer_text,
                    student: {
                        firstname: answer.survey_answer.student.user.firstname,
                        lastname: answer.survey_answer.student.user.lastname,
                    },
                })),
            })),
            teacher: {
                firstname: survey.module.teacher.user.firstname,
                lastname: survey.module.teacher.user.lastname,
            },
            subject: survey.module.subject.name,
            group: survey.module.group.name,
        });
    });

    it("should return null if the survey is not found", async () => {
        prismaMock.surveys.findUnique.mockResolvedValue(null);
        const response = await surveysQueries.getAdminSurveyByID(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.findUnique.mockRejectedValue(error);
        await expect(surveysQueries.getAdminSurveyByID(1)).rejects.toThrow(error);
    });
});

describe("Get teacher survey by ID", () => {
    it("should return the survey if the survey is found", async () => {
        const survey = {
            surveyID: 1,
            survey_template: {
                name: "Survey 1",
                questions: [
                    {
                        questionID: 1,
                        question_text: "Question 1",
                        question_type: { question_type: "radio" },
                        options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                        answer_questions: [
                            {
                                answer_text: "Option 1",
                            },
                        ],
                    },
                ],
            },
            module: {
                teacher: {
                    user: { firstname: "John", lastname: "Doe" },
                },
                subject: { name: "Math" },
                group: { name: "A" },
            },
        };

        prismaMock.surveys.findUnique.mockResolvedValue(survey);
        const response = await surveysQueries.getTeacherSurveyByID(1);
        expect(response).toEqual({
            surveyID: survey.surveyID,
            template_name: survey.survey_template.name,
            questions: survey.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
                answers: question.answer_questions.map(({ answer_text }) => ({ answer_text })),
            })),
            teacher: {
                firstname: survey.module.teacher.user.firstname,
                lastname: survey.module.teacher.user.lastname,
            },
            subject: survey.module.subject.name,
            group: survey.module.group.name,
        });
    });

    it("should return null if the survey is not found", async () => {
        prismaMock.surveys.findUnique.mockResolvedValue(null);
        const response = await surveysQueries.getTeacherSurveyByID(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.findUnique.mockRejectedValue(error);
        await expect(surveysQueries.getTeacherSurveyByID(1)).rejects.toThrow(error);
    });
});

describe("Get student survey by ID", () => {
    it("should return the survey if the survey is found", async () => {
        const survey = {
            surveyID: 1,
            survey_template: {
                name: "Survey 1",
                questions: [
                    {
                        questionID: 1,
                        question_text: "Question 1",
                        question_type: { question_type: "radio" },
                        options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                    },
                ],
            },
            module: {
                teacher: {
                    user: { firstname: "John", lastname: "Doe" },
                },
                subject: { name: "Math" },
                group: { name: "A" },
            },
        };

        prismaMock.surveys.findUnique.mockResolvedValue(survey);
        const response = await surveysQueries.getStudentSurveyByID(1);
        expect(response).toEqual({
            surveyID: survey.surveyID,
            template_name: survey.survey_template.name,
            questions: survey.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
            })),
            teacher: {
                firstname: survey.module.teacher.user.firstname,
                lastname: survey.module.teacher.user.lastname,
            },
            subject: survey.module.subject.name,
            group: survey.module.group.name,
        });
    });

    it("should return null if the survey is not found", async () => {
        prismaMock.surveys.findUnique.mockResolvedValue(null);
        const response = await surveysQueries.getStudentSurveyByID(1);
        expect(response).toBeNull();
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(
            new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }),
        );
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.findUnique.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.findUnique.mockRejectedValue(error);
        await expect(surveysQueries.getStudentSurveyByID(1)).rejects.toThrow(error);
    });
});

describe("Create survey", () => {
    it("should return the ID of the created survey", async () => {
        prismaMock.surveys.create.mockResolvedValue({ surveyID: 1 });
        const response = await surveysQueries.createSurvey(1, 1);
        expect(response).toEqual(1);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.create.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.create.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.create.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.create.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.create.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.create.mockRejectedValue(error);
        await expect(surveysQueries.createSurvey(1, 1)).rejects.toThrow(error);
    });
});

describe("Delete survey by ID", () => {
    it("should return the ID of the deleted survey", async () => {
        prismaMock.surveys.delete.mockResolvedValue({ surveyID: 1 });
        const response = await surveysQueries.deleteSurveyByID(1);
        expect(response).toEqual(1);
    });

    it("should throw a ConnectionError if a PrismaClientInitializationError occurs", async () => {
        prismaMock.surveys.delete.mockRejectedValue(new Prisma.PrismaClientInitializationError());
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ConnectionError if a PrismaClientRustPanicError occurs", async () => {
        prismaMock.surveys.delete.mockRejectedValue(new Prisma.PrismaClientRustPanicError());
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow(ConnectionError);
    });

    it("should throw a ValidationError if a PrismaClientValidationError occurs", async () => {
        prismaMock.surveys.delete.mockRejectedValue(new Prisma.PrismaClientValidationError("", {}));
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow();
    });

    it("should throw a ValidationError if an error code P2025 occurs", async () => {
        prismaMock.surveys.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", { code: "P2025" }));
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow(ValidationError);
    });

    it("should throw a DatabaseError if a PrismaClientKnownRequestError occurs", async () => {
        prismaMock.surveys.delete.mockRejectedValue(new Prisma.PrismaClientKnownRequestError("", {}));
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw a DatabaseError if a PrismaClientUnknownRequestError occurs", async () => {
        prismaMock.surveys.delete.mockRejectedValue(new Prisma.PrismaClientUnknownRequestError("", {}));
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow(DatabaseError);
    });

    it("should throw the error if an unknown error occurs", async () => {
        const error = new Error();
        prismaMock.surveys.delete.mockRejectedValue(error);
        await expect(surveysQueries.deleteSurveyByID(1)).rejects.toThrow(error);
    });
});
