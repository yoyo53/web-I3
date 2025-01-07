const queries = require('../database/queries/templates.queries.js');

async function getSurveyByID (req, res) {
    const survey = await queries.getTemplateByID(req.params.id);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error');
    }
  };

module.exports = {
    getSurveyByID,
};