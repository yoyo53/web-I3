const adminQueries = require('../database/queries/admin.queries');
const templateQueries = require('../database/queries/templates.queries');

async function getAdminSurveys(req, res) {
    const surveys = await adminQueries.getAllSurveys()
    if (surveys != null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching surveys');
    }
}

async function getSurveyTemplates(req, res) {
    const surveys = await templateQueries.getAllTemplates()
    if (surveys != null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching templates');
    }
}


module.exports = {
    getAdminSurveys,
    getSurveyTemplates,
};