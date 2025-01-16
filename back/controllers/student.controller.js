const surveysQueries = require("../database/queries/surveys.queries");
const answersQueries = require("../database/queries/answers.queries");

async function getStudentSurveys(request, response) {
    const surveys = await surveysQueries.getSurveysByStudentID(request.user_id);
    if (surveys !== null) {
        response.status(200).json(surveys);
    } else {
        response.status(500).send("error getting surveys");
    }
}

async function getSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    const survey = await surveysQueries.getStudentSurveyByID(surveyID, request.user_id);
    if (survey !== null) {
        response.status(200).json(survey);
    } else {
        response.status(404).json({ error: "survey not found" });
    }
}

async function answerSurvey(request, response) {
    const surveyID = parseInt(request.params.id);
    const { answers } = request.body;
    if (answers) {
        const survey = await surveysQueries.getStudentSurveyByID(surveyID, request.user_id);
        if (survey) {
            if (
                Object.keys(answers).length === survey.questions.length &&
                Set(Object.keys(answers)) === Set(survey.questions.map(({ questionID }) => questionID.toString())) &&
                Object.values(answers).every(
                    (responses) =>
                        Array.isArray(responses) &&
                        responses.length > 0 &&
                        responses.every((response) => typeof response === "string"),
                ) &&
                survey.questions.every((question) => {
                    const responses = answers[question.questionID];
                    if (question.question_type.question_type === "checkbox") {
                        return responses.every((response) =>
                            question.options.some(({ option_text }) => option_text === response),
                        );
                    } else if (question.question_type.question_type === "text") {
                        return responses.length === 1;
                    } else if (question.question_type.question_type === "radio") {
                        return (
                            responses.length === 1 &&
                            question.options.some(({ option_text }) => option_text === responses[0])
                        );
                    } else if (question.question_type.question_type === "score") {
                        return responses.length === 1 && Number.isInteger(responses[0]);
                    }
                    return false;
                })
            ) {
                const answerID = await answersQueries.answerSurvey(surveyID, request.user_id, answers);
                if (answerID !== null) {
                    response.status(200).json({ answerID: answerID });
                } else {
                    response.status(500).json({ error: "answering survey failed" });
                }
            } else {
                response.status(400).json({ error: "invalid answers" });
            }
        } else {
            response.status(404).json({ error: "survey not found" });
        }
    } else {
        response.status(400).json({ error: "missing fields" });
    }
}

module.exports = {
    getStudentSurveys,
    getSurveyByID,
    answerSurvey,
};
