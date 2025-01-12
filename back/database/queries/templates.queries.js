const { prisma } = require('../db.connection');

async function getAllTemplates() {
    try {
        return await prisma.survey_templates.findMany();
    } catch { return null }
}

async function getTemplateByID(templateID) {
        try {
            const result = await prisma.survey_templates.findUnique({
                where: {
                    survey_templateID: parseInt(templateID),
                },
                include: {
                    questions: {
                        include: {
                            options: {
                                select: {
                                    option_text: true, // Récupérer uniquement le texte des options
                                },
                            },
                            question_type: {
                                select: {
                                    question_type: true, // Récupérer le type de question
                                },
                            },
                        },
                    },
                },
            });
    
            // Transformer les données pour inclure les options comme objets JSON
            const transformedData = {
                name: result.name,
                questions: result.questions.map((question) => ({
                    question_text: question.question_text,
                    question_type: question.question_type.question_type,
                    options: question.options.map((option) => ({
                        option_text: option.option_text, // Format des options en JSON
                    })),
                })),
            };
    
            console.log(transformedData);
            return transformedData;
        } catch (error) {
            console.error(error);
            return null;
        }
    }




async function createTemplate(name, questions) {
    console.log(questions);
    questions.forEach(question => {
        delete question.id;
    });
    // Questions is an array of objects, each object has a question_text, question_type and options wich is an array of objects with option_text
    try {
        const Template = await prisma.survey_templates.create({
            data: {
                name: name,
                questions: {
                    create:
                        questions.map(question => ({
                            question_text: question.question_text,
                            // question_type: question.question_type,
                            question_type: {
                                connect: {
                                    question_type: question.question_type
                                }
                            },
                            options: {
                                create:
                                    question.options.map(option => ({
                                        option_text: option.option_text
                                    }))
                            }
                        }))
                }
            }
        });
        return Template;
    }
    catch (error) {
        console.error(error);
        return null
    }
}


module.exports = {
    getAllTemplates,
    createTemplate,
    getTemplateByID
};