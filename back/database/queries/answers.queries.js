const { prisma } = require("../db.connection");

async function answerSurvey(surveyID, studentID, answers) {
    try {
        const result = await prisma.survey_answers.create({
            data: {
                surveyID: surveyID,
                studentID: studentID,
                answer_questions: {
                    create: Object.entries(answers).flatMap(([questionID, responses]) =>
                        responses.map((response) => ({
                            questionID: questionID,
                            answer_text: response,
                        })),
                    ),
                },
            },
            select: { survey_answerID: true },
        });
        return result.survey_answerID;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    answerSurvey,
};
