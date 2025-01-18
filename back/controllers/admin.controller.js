const modulesQueries = require("../database/queries/modules.queries");
const templatesQueries = require("../database/queries/templates.queries");
const surveysQueries = require("../database/queries/surveys.queries");

async function getAllModules(request, response) {
    const modules = await modulesQueries.getAllModules();
    if (modules != null) {
        response.status(200).json(modules);
    } else {
        response.status(500).json({ error: "getting modules failed" });
    }
}

async function getAllTemplates(request, response) {
    const surveys = await templatesQueries.getAllTemplates();
    if (surveys !== null) {
        response.status(200).json(surveys);
    } else {
        response.status(500).json({ error: "getting templates failed" });
    }
}

async function getTemplateByID(request, response) {
    const templateID = parseInt(request.params.id);
    const template = await templatesQueries.getTemplateByID(templateID);
    if (template !== null) {
        response.status(200).json(template);
    } else {
        response.status(500).json({ error: "getting template failed" });
    }
}

async function createTemplate(request, response) {
    const { name, questions } = request.body;
    if (name && questions) {
        const templateID = await templatesQueries.createTemplate(name, questions);
        if (response !== null) {
            response.status(200).json({ templateID: templateID });
        } else {
            response.status(500).json({ error: "creating template failed" });
        }
    } else {
        response.status(400).json({ error: "missing fields" });
    }
}

async function deleteTemplateByID(request, response) {
    const templateID = parseInt(request.params.id);
    const deletedTemplateID = await templatesQueries.deleteTemplateByID(templateID);
    if (deletedTemplateID !== null) {
        response.status(200).json({ templateID: deletedTemplateID });
    } else {
        response.status(500).json({ error: "deleting template failed" });
    }
}

async function getAdminSurveys(request, response) {
    const surveys = await surveysQueries.getAllSurveys();
    if (surveys !== null) {
        response.status(200).json(surveys);
    } else {
        response.status(500).json({ error: "getting surveys failed" });
    }
}

async function getSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    const survey = await surveysQueries.getAdminSurveyByID(surveyID);
    if (survey !== null) {
        response.status(200).json(survey);
    } else {
        response.status(500).json({ error: "getting survey failed" });
    }
}

async function createSurveyFromTemplate(request, response) {
    const { moduleID, templateID } = request.body;
    if (moduleID && templateID) {
        const surveyID = await surveysQueries.createSurvey(moduleID, templateID);
        if (surveyID !== null) {
            response.status(200).json({ surveyID: surveyID });
        } else {
            response.status(500).json({ error: "creating survey failed" });
        }
    } else {
        response.status(400).json({ error: "missing fields" });
    }
}

async function createSurveyFromNothing(request, response) {
    const { name, moduleID, questions } = request.body;
    if (name && moduleID && questions) {
        const templateID = await templatesQueries.createTemplate(name, questions);
        if (templateID !== null) {
            const surveyID = await surveysQueries.createSurvey(moduleID, templateID);
            if (surveyID !== null) {
                response.status(200).json({ surveyID: surveyID });
            } else {
                response.status(500).json({ error: "creating survey failed" });
            }
        } else {
            response.status(500).json({ error: "creating template failed" });
        }
    } else {
        response.status(400).json({ error: "missing fields" });
    }
}

async function deleteSurveyByID(request, response) {
    const surveyID = parseInt(request.params.id);
    const deletedSurveyID = await surveysQueries.deleteSurveyByID(surveyID);
    if (deletedSurveyID !== null) {
        response.status(200).json({ surveyID: deletedSurveyID });
    } else {
        response.status(500).json({ error: "deleting survey failed" });
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
