const { prisma } = require('../db.connection')

async function checkExistsStudent(studentID) {
    try {
        return await prisma.students.count({ where: { studentID } }) > 0;
    }
    catch { return false }
}

async function checkExistsStudentNumber(student_number) {
    try {
        return await prisma.students.count({ where: { student_number } }) > 0;
    }
    catch { return false }
}

async function getUserByStudentNumber(student_number) {
    try {
        return await prisma.students.findUnique({
            where: { student_number },
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
    catch { return null }
}

async function getUserByStudentID(id) {
    try {
        return await prisma.students.findUnique({
            where: { studentID: id },
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
    catch { return null }
}

async function createStudent(userID, student_number) {
    try {
        const query = await prisma.students.create({
            data: {
                student_number,
                user: { connect: { userID } }
            },
            select: { studentID: true }
        });
        return query.studentID;
    }
    catch { return null }
}

async function updateStudent(id, student_number) {
    try {
        const query = await prisma.students.update({
            where: { studentID: id },
            data: { student_number },
            select: { studentID: true }
        });
        return query.studentID;
    }
    catch { return null }
}

async function deleteStudent(id) {
    try {
        const query = await prisma.students.delete({
            where: { studentID: id },
            select: { studentID: true }
        });
        return query.studentID;
    }
    catch { return null }
}

async function getSurveysByStudentID(student_id) {
    try {
        const surveys = await prisma.surveys.findMany({
            where: {
                module: {
                    group: {
                        students: {
                            some: {
                                studentID: student_id
                            }
                        }
                    }
                },
                survey_answers: {
                    none: {
                        studentID: student_id
                    }
                }
            },
            select: {
                surveyID: true,
                survey_template: {
                    select: {
                        name: true
                    }
                },
                module: {
                    select: {
                        subject: {
                            select: { name: true }
                        },
                        group: {
                            select: { name: true }
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
            surveyID: survey.surveyID,
            template_name: survey.survey_template.name,
            subject: survey.module.subject.name,
            group: survey.module.group.name,
            teacher_firstname: survey.module.teacher.user.firstname,
            teacher_lastname: survey.module.teacher.user.lastname
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getSurveyByID(surveyID) {
    try {
        // console.log(surveyID);
        const result = await prisma.surveys.findUnique({
            where: {
                surveyID: parseInt(surveyID),
            },
            include: {
                survey_template: {
                    include: {
                        questions: {
                            include: {
                                options: {
                                    select: {
                                        option_text: true
                                    }
                                },
                                question_type: {
                                    select: {
                                        question_type: true
                                    }
                                }
                            }
                        }
                    }
                },
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
                // answers: question.answer_questions.map((answer) => ({
                //     survey_answerID: answer.survey_answerID,
                //     answer_text: answer.answer_text,
                // })),
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

async function answerToSurvey(surveyID, studentID, answers) {
    // answers is an object with the following structure:
    // {questionID1 : [array_responses],
    //  questionID2 : [array_responses],
    //  ...}
    try {
        const survey = await prisma.surveys.findUnique({
            where: {
                surveyID: parseInt(surveyID),
                survey_answers: {
                    none: {
                        studentID: studentID
                    }
                }
            },
            include: {
                survey_template: {
                    include: {
                        questions: {
                            include: {
                                options: {
                                    select: {
                                        option_text: true
                                    }
                                },
                                question_type: {
                                    select: {
                                        question_type: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        // console.log(survey);
        if (!survey) {
            console.error(`Survey with ID ${surveyID} not found.`);
            return false;
        }
        // Vérifier que le nombre de réponses est égal au nombre de questions
        const questionIDs = Object.keys(answers);
        if (questionIDs.length !== survey.survey_template.questions.length) {
            console.log('Number of answers:', questionIDs.length);
            console.log('Number of questions:', survey.survey_template.questions.length);
            console.error('Number of answers does not match number of questions.');
            return false;
        }
        // Vérifier que chaque réponse correspond à une question
        for (const [questionID, responses] of Object.entries(answers)) {
            const question = survey.survey_template.questions.find(q => q.questionID === parseInt(questionID));
            if (!question) {
                console.error(`Question with ID ${questionID} not found in the survey.`);
                return false;
            }
            // Check if the responses are valid for the question type
            if (question.question_type.question_type === 'checkbox') {
                // responses is an array of response texts
                for (const response of responses) {
                    if (!question.options.some(option => option.option_text === response)) {
                        console.error(`Invalid option "${response}" for question with ID ${questionID}.`);
                        return false;
                    }
                    // Continue
                }
            }
        }
        // Créer les réponses
        const surveyAnswer = await prisma.survey_answers.create({
            data: {
                surveyID: parseInt(surveyID),
                studentID: studentID,
                answer_questions: {
                    create: Object.entries(answers).flatMap(([questionID, responses]) => 
                        (Array.isArray(responses) ? responses : [responses]).map(response => ({
                            questionID: parseInt(questionID),
                            answer_text: response
                        }))
                    )
                }
            }
        });
        const result = surveyAnswer ? true : false;
        return result;
    } catch (error) {
        console.error('Error answering survey:', error);
        return false;
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
    getSurveyByID,
    answerToSurvey
}