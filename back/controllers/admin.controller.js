const adminQueries = require('../database/queries/admin.queries');
const surveyQueries = require('../database/queries/surveys.queries');
const templateQueries = require('../database/queries/templates.queries');

async function getAdminSurveys(req, res) {
    const surveys = await surveyQueries.getAllSurveys()
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

async function createTemplate(req, res) {
    const response = await templateQueries.createTemplate(req.body.name, req.body.questions)
    if (response != null) {
        res.status(200).json(response);
    } else {
        res.status(500).send('Error while fetching templates');
    }
};

async function getTemplateByID(req, res) {
    const survey = await templateQueries.getTemplateByID(req.params.id)
    console.log(req.params.id);
    if (survey != null) {
        res.status(200).json(survey);
        console.log(survey);
    } else {
        res.status(500).send('Error while fetching this template');
    }
}

async function getAllModules(req, res) {
    const module = await adminQueries.getAllModules();
    if (module != null) {
        res.status(200).json(module);
    } else {
        res.status(500).send('Error while fetching this module');
    }
}

module.exports = {
    getAdminSurveys,
    getSurveyTemplates,
    createTemplate,
    getTemplateByID,
    getAllModules
};