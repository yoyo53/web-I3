const queries = require('../database/queries/teachers.query.js');

async function getTeacherSurveys (req, res) {
    const surveys = await queries.getSurveysByTeacherID(req.query.id);
    if (surveys !== null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error');
    }
  };

module.exports = {
    getTeacherSurveys
};