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

module.exports = {
    checkExistsStudent,
    checkExistsStudentNumber,
    getUserByStudentNumber,
    getUserByStudentID,
    createStudent,
    updateStudent,
    deleteStudent, 
    getSurveysByStudentID
}