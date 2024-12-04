const { options } = require('../../routes/admin');
const { prisma } = require('../db.connection');

async function getAllTemplates() {
    try {
        const query = await prisma.survey_templates.findMany();
        return query.rows;
    } catch { return null }
}

async function createSurveyTemplate(name, questions) {
    console.log(questions);
    questions.forEach(question => {
        delete question.id;
    });
    // Questions is an array of objects, each object has a question_text, question_type and options wich is an array of objects with option_text
    try {
        const surveyTemplate = await prisma.survey_templates.create({
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
                                // Connect to the options table with the option_text = option_text
                                create: question.options.map(option => ({
                                    option_text: option.option_text
                                }))
                            }
                        }))
                }
            }
        });
        return surveyTemplate;
    }
    catch (error) {
        console.error(error);
        return null
    }
}

module.exports = {
    getAllTemplates,
    createSurveyTemplate
};