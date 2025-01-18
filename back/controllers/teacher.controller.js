const surveysQueries = require("../database/queries/surveys.queries");

async function getTeacherSurveys(request, response) {
    const surveys = await surveysQueries.getSurveysByTeacherID(request.user_id);
    if (surveys !== null) {
        response.status(200).json(surveys);
    } else {
        response.status(500).json({ error: "error getting surveys" });
    }
}

async function getSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    const survey = await surveysQueries.getTeacherSurveyByID(surveyID, request.user_id);
    if (survey !== null) {
        response.status(200).json(survey);
    } else {
        response.status(500).json({ error: "error getting survey" });
    }
}

module.exports = {
    getTeacherSurveys,
    getSurveyByID,
};
