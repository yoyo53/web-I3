const { prisma } = require("../../../../database/db.connection");
const answersQueries = require("../../../../database/queries/answers.queries");

beforeAll(async () => {
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
    await prisma.teachers.create({
        data: {
            teacher_number: -1,
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
    await prisma.subjects.create({
        data: {
            subjectID: -1,
            name: "Subject 1",
        },
    });
    await prisma.groups.create({
        data: {
            groupID: -1,
            name: "Group 1",
            students: { connect: { student_number: -1 } },
        },
    });
    await prisma.modules.createMany({
        data: {
            moduleID: -1,
            teacherID: -2,
            subjectID: -1,
            groupID: -1,
        },
    });
    await prisma.question_types.create({
        data: {
            question_typeID: -1,
            question_type: "Type 1",
        },
    });
    await prisma.survey_templates.create({
        data: {
            survey_templateID: -1,
            name: "Template 1",
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
}, 10000);

afterEach(async () => {
    await prisma.survey_answers.deleteMany({ where: { surveyID: -1 } });
});

afterAll(async () => {
    await prisma.survey_templates.delete({ where: { survey_templateID: -1 } });
    await prisma.question_types.delete({ where: { question_typeID: -1 } });
    await prisma.modules.delete({ where: { moduleID: -1 } });
    await prisma.subjects.delete({ where: { subjectID: -1 } });
    await prisma.groups.delete({ where: { groupID: -1 } });
    await prisma.users.deleteMany({ where: { userID: { in: [-1, -2] } } });
    await prisma.$disconnect();
}, 10000);

describe("Answer survey", () => {
    it("should return the ID of the created answer", async () => {
        const response = await answersQueries.answerSurvey(-1, -1, { "-1": ["Answer 1"] });
        expect(response).toEqual(expect.any(Number));
    });
});
