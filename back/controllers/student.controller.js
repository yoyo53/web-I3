const studentQueries = require('../database/queries/student.queries');

async function getStudentName(req, res) {
    const name = await studentQueries.getStudentNameByID(parseInt(req.user_id));
    if (name != null) {
        res.status(200).json(name);
    } else {
        res.status(500).send('Error while fetching student name');
    }
}

async function getStudentSurveys(req, res) {
    const surveys = await studentQueries.getAllSurveys()
    if (surveys != null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching surveys');
    }
}

module.exports = {
    getStudentName,
    getStudentSurveys
};