const { prisma } = require('../db.connection')

async function checkExistsStudent(studentID) {
    try {
        return await prisma.students.count({where: {studentID}}) > 0;
    }
    catch {return false}
}

async function checkExistsStudentNumber(student_number) {
    try {
        return await prisma.students.count({where: {student_number}}) > 0;
    }
    catch {return false}
}

async function getUserByStudentNumber(student_number) {
    try {
        return await prisma.students.findUnique({
            where: {student_number},
            select: {
                studentID: true,
                student_number: true,
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

async function getUserByStudentID(id) {
    try {
        return await prisma.students.findUnique({
            where: {studentID: id},
            select: {
                studentID: true,
                student_number: true,
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

async function createStudent(userID, student_number) {
    try {
        const query = await prisma.students.create({
            data: {
                student_number,
                user: {connect: {userID}}
            },
            select: {studentID: true}
        });
        return query.studentID;
    }
    catch {return null}
}

async function updateStudent(id, student_number) {
    try {
        const query = await prisma.students.update({
            where: {studentID: id},
            data: {student_number},
            select: {studentID: true}
        });
        return query.studentID;
    }
    catch {return null}
}

async function deleteStudent(id) {
    try {
        const query = await prisma.students.delete({
            where: {studentID: id},
            select: {studentID: true}
        });
        return query.studentID;
    }
    catch {return null}
}

async function getSurveysByStudentID(id) {
    try {
        const surveys = await prisma.surveys.findMany({
            where: {
                survey_answers: {
                    some: {
                        studentID: id
                    }
                }
            },
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
    checkExistsStudent,
    checkExistsStudentNumber,
    getUserByStudentNumber,
    getUserByStudentID,
    createStudent,
    updateStudent,
    deleteStudent, 
    getSurveysByStudentID, 
    getSurveyByID
}