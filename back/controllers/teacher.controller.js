const surveysQueries = require("../database/queries/surveys.queries");

async function getTeacherSurveys(request, response) {
    const surveys = await surveysQueries.getSurveysByTeacherID(request.user_id);
    response.status(200).json(surveys);
}

async function getSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    if (Number.isInteger(surveyID)) {
        const survey = await surveysQueries.getTeacherSurveyByID(surveyID, request.user_id);
        if (survey !== null) {
            response.status(200).json(survey);
        } else {
            response.status(404).json({ error: "survey not found" });
        }
    } else {
        response.status(400).json({ error: "invalid or missing survey ID" });
    }
}

module.exports = {
    getTeacherSurveys,
    getSurveyByID,
};
