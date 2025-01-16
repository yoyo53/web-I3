const { prisma } = require("../db.connection");

async function getAllTemplates() {
    try {
        const result = await prisma.survey_templates.findMany({
            select: { survey_templateID: true, name: true },
        });
        return result.map((template) => ({
            templateID: template.survey_templateID,
            name: template.name,
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTemplateByID(templateID) {
    try {
        const result = await prisma.survey_templates.findUnique({
            where: { survey_templateID: templateID },
            select: {
                survey_templateID: true,
                name: true,
                questions: {
                    select: {
                        questionID: true,
                        question_text: true,
                        question_type: { select: { question_type: true } },
                        options: { select: { option_text: true } },
                    },
                },
            },
        });
        return {
            templateID: result.survey_templateID,
            name: result.name,
            questions: result.questions.map((question) => ({
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
            })),
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createTemplate(name, questions) {
    try {
        const result = await prisma.survey_templates.create({
            data: {
                name: name,
                questions: {
                    create: questions.map((question) => ({
                        question_text: question.question_text,
                        question_type: { connect: { question_type: question.question_type } },
                        options: { create: question.options.map(({ option_text }) => ({ option_text })) },
                    })),
                },
            },
            select: { survey_templateID: true },
        });
        return result.survey_templateID;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function deleteTemplateByID(survey_templateID) {
    try {
        const result = await prisma.survey_templates.delete({
            where: { survey_templateID: survey_templateID },
            select: { survey_templateID: true },
        });
        return result.survey_templateID;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getAllTemplates,
    getTemplateByID,
    createTemplate,
    deleteTemplateByID,
};
