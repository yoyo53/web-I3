const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function answerSurvey(surveyID, studentID, answers) {
    return await handleErrors(async () => {
        const result = await prisma.survey_answers.create({
            data: {
                survey: { connect: { surveyID: surveyID } },
                student: { connect: { studentID: studentID } },
                answer_questions: {
                    create: Object.entries(answers).flatMap(([questionID, responses]) =>
                        responses.map((response) => ({
                            question: { connect: { questionID: parseInt(questionID) } },
                            answer_text: response,
                        })),
                    ),
                },
            },
            select: { survey_answerID: true },
        });
        return result.survey_answerID;
    });
}

module.exports = {
    answerSurvey,
};
