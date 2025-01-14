const queries = require('../database/queries/student.queries.js');

async function getStudentSurveys(req, res) {
    const surveys = await queries.getSurveysByStudentID(req.user_id);
    if (surveys !== null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching surveys');
    }
}

async function getSurveyByID(req, res) {
    const survey = await queries.getSurveyByID(req.params.id);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error while fetching survey');
    }
}

module.exports = {
    getStudentSurveys, 
    getSurveyByID
};