const modulesQueries = require("../database/queries/modules.queries");
const templatesQueries = require("../database/queries/templates.queries");
const surveysQueries = require("../database/queries/surveys.queries");

async function getAllModules(request, response) {
    const modules = await modulesQueries.getAllModules();
    response.status(200).json(modules);
}

async function getAllTemplates(request, response) {
    const surveys = await templatesQueries.getAllTemplates();
    response.status(200).json(surveys);
}

async function getTemplateByID(request, response) {
    const templateID = parseInt(request.params.id);
    if (Number.isInteger(templateID)) {
        const template = await templatesQueries.getTemplateByID(templateID);
        if (template !== null) {
            response.status(200).json(template);
        } else {
            response.status(404).json({ error: "template not found" });
        }
    } else {
        response.status(400).json({ error: "invalid or missing template ID" });
    }
}

async function createTemplate(request, response) {
    const { name, questions } = request.body;
    if (typeof name === "string" && questions instanceof Array) {
        const templateID = await templatesQueries.createTemplate(name, questions);
        response.status(201).json({ templateID: templateID });
    } else {
        response.status(400).json({ error: "invalid or missing required fields" });
    }
}

async function deleteTemplateByID(request, response) {
    const templateID = parseInt(request.params.id);
    if (Number.isInteger(templateID)) {
        await templatesQueries.deleteTemplateByID(templateID);
        response.status(204).end();
    } else {
        response.status(400).json({ error: "invalid or missing template ID" });
    }
}

async function getAdminSurveys(request, response) {
    const surveys = await surveysQueries.getAllSurveys();
    response.status(200).json(surveys);
}

async function getSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    if (Number.isInteger(surveyID)) {
        const survey = await surveysQueries.getAdminSurveyByID(surveyID);
        if (survey !== null) {
            response.status(200).json(survey);
        } else {
            response.status(404).json({ error: "survey not found" });
        }
    } else {
        response.status(400).json({ error: "invalid or missing survey ID" });
    }
}

async function createSurveyFromTemplate(request, response) {
    const { moduleID, templateID } = request.body;
    if (Number.isInteger(moduleID) && Number.isInteger(templateID)) {
        const surveyID = await surveysQueries.createSurvey(moduleID, templateID);
        response.status(201).json({ surveyID: surveyID });
    } else {
        response.status(400).json({ error: "invalid or missing required fields" });
    }
}

async function createSurveyFromNothing(request, response) {
    const { name, questions, moduleID } = request.body;
    if (typeof name === "string" && questions instanceof Array && Number.isInteger(moduleID)) {
        const templateID = await templatesQueries.createTemplate(name, questions);
        const surveyID = await surveysQueries.createSurvey(moduleID, templateID);
        response.status(201).json({ surveyID: surveyID });
    } else {
        response.status(400).json({ error: "invalid or missing required fields" });
    }
}

async function deleteSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    if (Number.isInteger(surveyID)) {
        await surveysQueries.deleteSurveyByID(surveyID);
        response.status(204).end();
    } else {
        response.status(400).json({ error: "invalid or missing survey ID" });
    }
}

module.exports = {
    getAllModules,
    getAllTemplates,
    getTemplateByID,
    createTemplate,
    deleteTemplateByID,
    getAdminSurveys,
    getSurveyByID,
    createSurveyFromTemplate,
    createSurveyFromNothing,
    deleteSurveyByID,
};
