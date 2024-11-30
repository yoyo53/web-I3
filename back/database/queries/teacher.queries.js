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
        const surveys = await prisma.findMany({
            where: {teacherID: id},
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
    } catch {
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
    getSurveysByTeacherID
}