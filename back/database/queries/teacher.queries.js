const { prisma } = require('../db.connection')

async function checkExistsTeacher(teacherID) {
    try {
        return await prisma.teachers.count({where: {teacherID}}) > 0;
    }
    catch {return false}
}

async function checkExistsTeacherNumber(teacher_number) {
    try {
        return await prisma.teachers.count({where: {teacher_number}}) > 0;
    }
    catch {return false}
}

async function getUserByTeacherNumber(teacher_number) {
    try {
        return await prisma.teachers.findUnique({
            where: {teacher_number},
            select: {
                teacherID: true,
                teacher_number: true,
                user: {
                    select: {
                        userID: true,
                        firstname: true,
                        lastname: true,
                        email: true
                    }
                }
            }
        });
    }
    catch {return null}
}

async function getUserByTeacherID(id) {
    try {
        return await prisma.teachers.findUnique({
            where: {teacherID: id},
            select: {
                teacherID: true,
                teacher_number: true,
                user: {
                    select: {
                        userID: true,
                        firstname: true,
                        lastname: true,
                        email: true
                    }
                }
            }
        });
    }
    catch {return null}
}
async function createTeacher(userID, teacher_number) {
    try {
        const query = await prisma.teachers.create({
            data: {
                teacher_number,
                user: {connect: {userID}}
            },
            select: {teacherID: true}
        });
        return query.teacherID;
    }
    catch {return null}
}
async function updateTeacher(id, teacher_number) {
    try {
        const query = await prisma.teachers.update({
            where: {teacherID: id},
            data: {teacher_number},
            select: {teacherID: true}
        });
        return query.teacherID;
    }
    catch {return null}
}

async function deleteTeacher(id) {
    try {
        const response = await prisma.teachers.delete({
            where: {teacherID: id},
            select: {teacherID: true}
        });
        return response.teacherID;
    }
    catch {return null}
}

async function getSurveysByTeacherID(id) {
    try {
        const surveys = await prisma.surveys.findMany({
            where: {module: {teacherID: id}},
            select: {
            surveyID: true,
            module: {
                select: {
                    subject: {
                        select: {
                            name: true
                        }
                    },
                    group: {
                        select: {
                            name: true
                        }
                    },
                    teacher: {
                        select: {
                            user: {
                                select: {
                                    firstname: true,
                                    lastname: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    return surveys.map(survey => ({
        surveyid: survey.surveyID,
        subject: survey.module.subject.name,
        group: survey.module.group.name,
        firstname: survey.module.teacher.user.firstname,
        lastname: survey.module.teacher.user.lastname
    }));
    } catch (error) {
        console.error(error);
        return null;
    }

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
                })),
            })),
            subject: result.module.subject.name,
            group: result.module.group.name,
            teacher: {
                firstname: result.module.teacher.user.firstname,
                lastname: result.module.teacher.user.lastname,
            },
        };
        return transformedData;
    } catch (error) {
        console.error('Error fetching survey by ID:', error);
        return null;
    }
}

module.exports = {
    checkExistsTeacher,
    checkExistsTeacherNumber,
    getUserByTeacherNumber,
    getUserByTeacherID,
    createTeacher,
    updateTeacher,
    deleteTeacher,
    getSurveysByTeacherID,
    getSurveyByID
}