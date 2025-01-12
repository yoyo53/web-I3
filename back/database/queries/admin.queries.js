const { prisma } = require('../db.connection');


async function getAllSurveys() {
    try {
        const surveys = await prisma.surveys.findMany({
            select: {
                surveyid: true,
                teachers: {
                    select: {
                        users: {
                            select: {
                                lastname: true,
                                firstname: true
                            }
                        }
                    }
                },
                modules: {
                    select: {
                        subjects: {
                            select: {
                                name: true
                            }
                        },
                        groups: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return surveys.map(survey => ({
            surveyid: survey.surveyid,
            lastname: survey.teachers.users.lastname,
            firstname: survey.teachers.users.firstname,
            subject: survey.modules.subjects.name,
            group: survey.modules.groups.name
        }));
    }
    catch {return null}
}

async function checkExistsAdmin(adminID) {
    try {
        return await prisma.admins.count({where: {adminID}}) > 0;
    }
    catch {return false}
}

async function getSurveyByID(surveyID) {
    try {
        const result = await prisma.surveys.findUnique({
            where: {
                surveyID: parseInt(surveyID),
            },
            include: {
                survey_template: {
                    select: {
                        name: true, // Nom du template (facultatif)
                        questions: {
                            select: {
                                questionID: true, // Récupérer l'ID de la question
                                question_text: true, // Texte de la question
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
                                answer_questions: {
                                    select: {
                                        survey_answerID: true,
                                        answer_text: true, // Récupérer les réponses des étudiants
                                        survey_answer: {
                                            select: {
                                                student: {
                                                    select: {
                                                        user: {
                                                            select: {
                                                                firstname: true,
                                                                lastname: true, // Prénom et nom de l'étudiant
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                module: {
                    select: {
                        subject: {
                            select: {
                                name: true, // Nom de la matière
                            },
                        },
                        group: {
                            select: {
                                name: true, // Nom du groupe
                            },
                        },
                        teacher: {
                            select: {
                                user: {
                                    select: {
                                        firstname: true,
                                        lastname: true, // Prénom et nom du professeur
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!result) {
            console.error(`Survey with ID ${surveyID} not found.`);
            return null;
        }

        // Transformer les données pour inclure les options et réponses comme objets JSON
        const transformedData = {
            surveyID: result.surveyID,
            template_name: result.survey_template.name,
            questions: result.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map((option) => ({
                    option_text: option.option_text,
                })),
                answers: question.answer_questions.map((answer) => ({
                    survey_answerID: answer.survey_answerID,
                    answer_text: answer.answer_text,
                    student: {
                        firstname: answer.survey_answer.student.user.firstname,
                        lastname: answer.survey_answer.student.user.lastname,
                    },
                })),
            })),
            subject: result.module.subject.name,
            group: result.module.group.name,
            teacher: {
                firstname: result.module.teacher.user.firstname,
                lastname: result.module.teacher.user.lastname,
            },
        };

        console.log(transformedData);
        return transformedData;
    } catch (error) {
        console.error('Error fetching survey by ID:', error);
        return null;
    }
}

module.exports = {
    getAllSurveys,
    checkExistsAdmin,
    getSurveyByID
}
