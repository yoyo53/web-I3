const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function checkExistsTeacherNumber(teacher_number) {
    return await handleErrors(async () => {
        const result = await prisma.teachers.findFirst({
            where: { teacher_number: teacher_number },
            select: { teacherID: true },
        });
        return result !== null;
    });
}

async function getUserByTeacherID(teacherID) {
    return await handleErrors(async () => {
        const result = prisma.teachers.findUnique({
            where: { teacherID: teacherID },
            select: {
                teacherID: true,
                teacher_number: true,
                user: { select: { userID: true, firstname: true, lastname: true, email: true } },
            },
        });
        return result;
    });
}

async function createTeacher(teacher_number, firstname, lastname, email, hashed_password) {
    return await handleErrors(async () => {
        const result = await prisma.teachers.create({
            data: {
                teacher_number: teacher_number,
                user: {
                    create: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        hashed_password: hashed_password,
                    },
                },
            },
            select: { teacherID: true },
        });
        return result.teacherID;
    });
}

module.exports = {
    checkExistsTeacherNumber,
    getUserByTeacherID,
    createTeacher,
};
