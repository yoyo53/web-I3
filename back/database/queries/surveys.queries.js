const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function getAllSurveys() {
    return await handleErrors(async () => {
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
    });
}

async function getSurveysByTeacherID(teacherID) {
    return await handleErrors(async () => {
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
    });
}

async function getSurveysByStudentID(studentID) {
    return await handleErrors(async () => {
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
    });
}

async function getAdminSurveyByID(surveyID) {
    return await handleErrors(async () => {
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
        if (result === null) return null;
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
    });
}

async function getTeacherSurveyByID(surveyID, teacherID) {
    return await handleErrors(async () => {
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
                                question_type: { select: { question_type: true } },
                                options: { select: { option_text: true } },
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
        if (result === null) return null;
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
    });
}

async function getStudentSurveyByID(surveyID, studentID) {
    return await handleErrors(async () => {
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
                                question_text: true,
                                question_type: { select: { question_type: true } },
                                options: { select: { option_text: true } },
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
        if (result === null) return null;
        return {
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
    });
}

async function createSurvey(moduleID, templateID) {
    return await handleErrors(async () => {
        const result = await prisma.surveys.create({
            data: {
                module: { connect: { moduleID: moduleID } },
                survey_template: { connect: { survey_templateID: templateID } },
            },
            select: { surveyID: true },
        });
        return result.surveyID;
    });
}

async function deleteSurveyByID(surveyID) {
    return await handleErrors(async () => {
        const result = await prisma.surveys.delete({
            where: { surveyID: surveyID },
            select: { surveyID: true },
        });
        return result.surveyID;
    });
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
