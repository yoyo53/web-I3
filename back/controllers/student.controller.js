const queries = require('../database/queries/student.queries.js');

async function getStudentSurveys(req, res) {
    const surveys = await queries.getSurveysByStudentID(req.user_id);
    if (surveys != null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching surveys');
    }
}

module.exports = {
    getStudentSurveys
};