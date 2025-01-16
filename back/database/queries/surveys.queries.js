const { prisma } = require("../db.connection");

async function getAllSurveys() {
    try {
        const surveys = await prisma.surveys.findMany({
            select: {
                surveyID: true,
                module: {
                    select: {
                        teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                        subject: { select: { name: true } },
                        group: { select: { name: true } },
                    },
                },
            },
        });
        return surveys.map((survey) => ({
            surveyID: survey.surveyID,
            teacher: {
                firstname: survey.module.teacher.user.firstname,
                lastname: survey.module.teacher.user.lastname,
            },
            subject: survey.module.subject.name,
            group: survey.module.group.name,
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getSurveysByTeacherID(teacherID) {
    try {
        const surveys = await prisma.surveys.findMany({
            where: { module: { teacherID: teacherID } },
            select: {
                surveyID: true,
                module: {
                    select: {
                        teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                        subject: { select: { name: true } },
                        group: { select: { name: true } },
                    },
                },
            },
        });
        return surveys.map((survey) => ({
            surveyID: survey.surveyID,
            teacher: {
                firstname: survey.module.teacher.user.firstname,
                lastname: survey.module.teacher.user.lastname,
            },
            subject: survey.module.subject.name,
            group: survey.module.group.name,
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getSurveysByStudentID(studentID) {
    try {
        const surveys = await prisma.surveys.findMany({
            where: {
                module: { group: { students: { some: { studentID: studentID } } } },
                survey_answers: { none: { studentID: studentID } },
            },
            select: {
                surveyID: true,
                module: {
                    select: {
                        teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                        subject: { select: { name: true } },
                        group: { select: { name: true } },
                    },
                },
            },
        });
        return surveys.map((survey) => ({
            surveyID: survey.surveyID,
            teacher: {
                firstname: survey.module.teacher.user.firstname,
                lastname: survey.module.teacher.user.lastname,
            },
            subject: survey.module.subject.name,
            group: survey.module.group.name,
        }));
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAdminSurveyByID(surveyID) {
    try {
        const result = await prisma.surveys.findUnique({
            where: { surveyID: surveyID },
            select: {
                surveyID: true,
                survey_template: {
                    select: {
                        name: true,
                        questions: {
                            select: {
                                questionID: true,
                                question_text: true,
                                question_type: { select: { question_type: true } },
                                options: { select: { option_text: true } },
                                answer_questions: {
                                    where: { survey_answer: { surveyID: surveyID } },
                                    select: {
                                        answer_text: true,
                                        survey_answer: {
                                            select: {
                                                student: {
                                                    select: { user: { select: { firstname: true, lastname: true } } },
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
                        teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                        subject: { select: { name: true } },
                        group: { select: { name: true } },
                    },
                },
            },
        });
        return {
            surveyID: result.surveyID,
            template_name: result.survey_template.name,
            questions: result.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
                answers: question.answer_questions.map((answer) => ({
                    answer_text: answer.answer_text,
                    student: {
                        firstname: answer.survey_answer.student.user.firstname,
                        lastname: answer.survey_answer.student.user.lastname,
                    },
                })),
            })),
            teacher: {
                firstname: result.module.teacher.user.firstname,
                lastname: result.module.teacher.user.lastname,
            },
            subject: result.module.subject.name,
            group: result.module.group.name,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getTeacherSurveyByID(surveyID, teacherID) {
    try {
        const result = await prisma.surveys.findUnique({
            where: { surveyID: surveyID, module: { teacherID: teacherID } },
            select: {
                surveyID: true,
                survey_template: {
                    select: {
                        name: true,
                        questions: {
                            select: {
                                questionID: true,
                                question_text: true,
                                options: { select: { option_text: true } },
                                question_type: { select: { question_type: true } },
                                answer_questions: {
                                    where: { survey_answer: { surveyID: surveyID } },
                                    select: { answer_text: true },
                                },
                            },
                        },
                    },
                },
                module: {
                    select: {
                        teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                        subject: { select: { name: true } },
                        group: { select: { name: true } },
                    },
                },
            },
        });
        return {
            surveyID: result.surveyID,
            template_name: result.survey_template.name,
            questions: result.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
                answers: question.answer_questions.map(({ answer_text }) => ({ answer_text })),
            })),
            teacher: {
                firstname: result.module.teacher.user.firstname,
                lastname: result.module.teacher.user.lastname,
            },
            subject: result.module.subject.name,
            group: result.module.group.name,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getStudentSurveyByID(surveyID, studentID) {
    try {
        const result = await prisma.surveys.findUnique({
            where: { surveyID: surveyID, module: { group: { students: { some: { studentID: studentID } } } } },
            select: {
                surveyID: true,
                survey_template: {
                    select: {
                        name: true,
                        questions: {
                            select: {
                                questionID: true,
                                options: { select: { option_text: true } },
                                question_type: { select: { question_type: true } },
                            },
                        },
                    },
                },
                module: {
                    select: {
                        teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                        subject: { select: { name: true } },
                        group: { select: { name: true } },
                    },
                },
            },
        });
        const transformedData = {
            surveyID: result.surveyID,
            template_name: result.survey_template.name,
            questions: result.survey_template.questions.map((question) => ({
                questionID: question.questionID,
                question_text: question.question_text,
                question_type: question.question_type.question_type,
                options: question.options.map(({ option_text }) => ({ option_text })),
            })),
            teacher: {
                firstname: result.module.teacher.user.firstname,
                lastname: result.module.teacher.user.lastname,
            },
            subject: result.module.subject.name,
            group: result.module.group.name,
        };
        return transformedData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createSurvey(moduleID, survey_templateID) {
    try {
        return await prisma.surveys.create({
            data: {
                module: { connect: { moduleID } },
                survey_template: { connect: { survey_templateID } },
            },
            select: { surveyID: true },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function deleteSurveyByID(surveyID) {
    try {
        return await prisma.surveys.delete({
            where: { surveyID: surveyID },
            select: { surveyID: true },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getAllSurveys,
    getSurveysByTeacherID,
    getSurveysByStudentID,
    getAdminSurveyByID,
    getTeacherSurveyByID,
    getStudentSurveyByID,
    createSurvey,
    deleteSurveyByID,
};
