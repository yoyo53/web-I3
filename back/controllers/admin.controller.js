const adminQueries = require('../database/queries/admin.queries');
const templateQueries = require('../database/queries/templates.queries');
const { getSurveyByID } = require('./teacher.controller');

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

async function createSurveyFromTemplate(req, res) {
    const { moduleID, survey_templateID } = req.body;
    const survey = await adminQueries.createSurveyFromTemplate(moduleID, survey_templateID);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error');
    }
};

async function createSurveyFromNothing(req, res) {
    const { name, moduleID , questions} = req.body;
    if (moduleID === undefined) {
        res.status(400).send('moduleID is required');
        return;
    }
    if (name === undefined) {
        res.status(400).send('name is required');
        return;
    }
    if (questions === undefined) {
        res.status(400).send('questions is required');
        return;
    }
    const template = await templateQueries.createTemplate(name, questions);
    console.log(template.survey_templateID);
    const survey = await adminQueries.createSurveyFromTemplate(moduleID, template.survey_templateID);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error');
    }
}

module.exports = {
    getAdminSurveys,
    getSurveyTemplates,
    createTemplate,
    getTemplateByID,
    getAllModules,
    createSurveyFromTemplate,
    createSurveyFromNothing,
    getSurveyByID
};