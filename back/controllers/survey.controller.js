const template_queries = require('../database/queries/templates.queries.js');
const survey_queries = require('../database/queries/surveys.queries.js');

async function getSurveyByID(req, res) {
    const survey = await template_queries.getTemplateByID(req.params.id);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error');
    }
};

async function createSurveyFromTemplate(req, res) {
    const { moduleID, survey_templateID } = req.body;
    const survey = await survey_queries.createSurveyFromTemplate(moduleID, survey_templateID);
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
    const template = await template_queries.createTemplate(name, questions);
    console.log(template.survey_templateID);
    const survey = await survey_queries.createSurveyFromTemplate(moduleID, template.survey_templateID);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error');
    }
}

module.exports = {
    getSurveyByID,
    createSurveyFromTemplate,
    createSurveyFromNothing
};