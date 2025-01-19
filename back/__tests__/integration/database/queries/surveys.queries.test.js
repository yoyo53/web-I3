const { prisma } = require("../../../../database/db.connection");
const surveysQueries = require("../../../../database/queries/surveys.queries");

beforeEach(async () => {
    await prisma.students.create({
        data: {
            student_number: -1,
            user: {
                create: {
                    userID: -1,
                    firstname: "John",
                    lastname: "Doe",
                    email: "john.doe@mail.com",
                    hashed_password: "password",
                },
            },
        },
    });
    await prisma.students.create({
        data: {
            student_number: -2,
            user: {
                create: {
                    userID: -2,
                    firstname: "Jane",
                    lastname: "Doe",
                    email: "jane.doe@mail.com",
                    hashed_password: "password",
                },
            },
        },
    });
    await prisma.teachers.create({
        data: {
            teacher_number: -1,
            user: {
                create: {
                    userID: -3,
                    firstname: "Jane",
                    lastname: "Doe",
                    email: "jane.doe@email.com",
                    hashed_password: "password",
                },
            },
        },
    });
    await prisma.groups.create({
        data: {
            groupID: -1,
            name: "Group 1",
            students: { connect: [{ student_number: -1 }, { student_number: -2 }] },
        },
    });
    await prisma.subjects.create({
        data: {
            subjectID: -1,
            name: "Subject 1",
        },
    });
    await prisma.modules.createMany({
        data: {
            moduleID: -1,
            teacherID: -3,
            subjectID: -1,
            groupID: -1,
        },
    });
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
    await prisma.surveys.createMany({
        data: {
            surveyID: -1,
            moduleID: -1,
            survey_templateID: -1,
        },
    });
    await prisma.survey_answers.createMany({
        data: {
            survey_answerID: -1,
            surveyID: -1,
            studentID: -1,
        },
    });
    await prisma.answer_questions.createMany({
        data: {
            answer_questionID: -1,
            survey_answerID: -1,
            questionID: -1,
            answer_text: "Option 1",
        },
    });
});

afterEach(async () => {
    await prisma.question_types.delete({ where: { question_typeID: -1 } });
    await prisma.survey_templates.delete({ where: { survey_templateID: -1 } });
    await prisma.modules.delete({ where: { moduleID: -1 } });
    await prisma.subjects.delete({ where: { subjectID: -1 } });
    await prisma.groups.delete({ where: { groupID: -1 } });
    await prisma.users.delete({ where: { userID: -1 } });
    await prisma.users.delete({ where: { userID: -2 } });
    await prisma.users.delete({ where: { userID: -3 } });
});

describe("Get all surveys", () => {
    it("should return all surveys", async () => {
        const response = await surveysQueries.getAllSurveys();
        expect(response).toEqual(
            expect.arrayContaining([
                {
                    surveyID: -1,
                    teacher: {
                        firstname: "Jane",
                        lastname: "Doe",
                    },
                    subject: "Subject 1",
                    group: "Group 1",
                },
            ]),
        );
    });
});

describe("Get surveys by teacher ID", () => {
    it("should return all surveys by teacher ID", async () => {
        const response = await surveysQueries.getSurveysByTeacherID(-3);
        expect(response).toEqual(
            expect.arrayContaining([
                {
                    surveyID: -1,
                    teacher: {
                        firstname: "Jane",
                        lastname: "Doe",
                    },
                    subject: "Subject 1",
                    group: "Group 1",
                },
            ]),
        );
    });
});

describe("Get surveys by student ID", () => {
    it("should return all surveys by student ID", async () => {
        const response = await surveysQueries.getSurveysByStudentID(-2);
        expect(response).toEqual(
            expect.arrayContaining([
                {
                    surveyID: -1,
                    teacher: {
                        firstname: "Jane",
                        lastname: "Doe",
                    },
                    subject: "Subject 1",
                    group: "Group 1",
                },
            ]),
        );
    });
});

describe("Get admin survey by ID", () => {
    it("should return survey by ID", async () => {
        const response = await surveysQueries.getAdminSurveyByID(-1);
        expect(response).toEqual({
            surveyID: -1,
            template_name: "Template 1",
            questions: [
                {
                    questionID: -1,
                    question_text: "Question 1",
                    question_type: "Type 1",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                    answers: [{ answer_text: "Option 1", student: { firstname: "John", lastname: "Doe" } }],
                },
            ],
            teacher: {
                firstname: "Jane",
                lastname: "Doe",
            },
            subject: "Subject 1",
            group: "Group 1",
        });
    });

    it("should return null if survey does not exist", async () => {
        const response = await surveysQueries.getAdminSurveyByID(-2);
        expect(response).toBeNull();
    });
});

describe("Get teacher survey by ID", () => {
    it("should return survey by ID", async () => {
        const response = await surveysQueries.getTeacherSurveyByID(-1, -3);
        expect(response).toEqual({
            surveyID: -1,
            template_name: "Template 1",
            questions: [
                {
                    questionID: -1,
                    question_text: "Question 1",
                    question_type: "Type 1",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                    answers: [{ answer_text: "Option 1" }],
                },
            ],
            teacher: {
                firstname: "Jane",
                lastname: "Doe",
            },
            subject: "Subject 1",
            group: "Group 1",
        });
    });

    it("should return null if survey does not exist", async () => {
        const response = await surveysQueries.getTeacherSurveyByID(-2, -3);
        expect(response).toBeNull();
    });
});

describe("Get student survey by ID", () => {
    it("should return survey by ID", async () => {
        const response = await surveysQueries.getStudentSurveyByID(-1, -2);
        expect(response).toEqual({
            surveyID: -1,
            template_name: "Template 1",
            questions: [
                {
                    questionID: -1,
                    question_text: "Question 1",
                    question_type: "Type 1",
                    options: [{ option_text: "Option 1" }, { option_text: "Option 2" }],
                },
            ],
            teacher: {
                firstname: "Jane",
                lastname: "Doe",
            },
            subject: "Subject 1",
            group: "Group 1",
        });
    });

    it("should return null if survey does not exist", async () => {
        const response = await surveysQueries.getStudentSurveyByID(-2, -2);
        expect(response).toBeNull();
    });
});

describe("Create survey", () => {
    it("should return ID of the created survey", async () => {
        const response = await surveysQueries.createSurvey(-1, -1);
        expect(response).toEqual(expect.any(Number));
    });
});

describe("Delete survey", () => {
    it("should return ID of the deleted survey", async () => {
        const response = await surveysQueries.deleteSurveyByID(-1);
        expect(response).toEqual(-1);
    });
});
