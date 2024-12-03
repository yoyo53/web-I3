const queries = require('../database/queries/teacher.queries.js');

async function getTeacherSurveys (req, res) {
    const surveys = await queries.getSurveysByTeacherID(req.user_id);
    if (surveys !== null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error');
    }
  };

module.exports = {
    getTeacherSurveys
};