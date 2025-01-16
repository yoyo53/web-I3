const { prisma } = require("../db.connection");

async function checkExistsTeacher(teacherID) {
    try {
        const result = await prisma.teachers.findFirst({
            where: { teacherID: teacherID },
            select: { teacherID: true },
        });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function checkExistsTeacherNumber(teacher_number) {
    try {
        const result = await prisma.teachers.findFirst({
            where: { teacher_number: teacher_number },
            select: { teacherID: true },
        });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getUserByTeacherID(teacherID) {
    try {
        return await prisma.teachers.findUnique({
            where: { teacherID: teacherID },
            select: {
                teacherID: true,
                teacher_number: true,
                user: { select: { userID: true, firstname: true, lastname: true, email: true } },
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createTeacher(teacher_number, firstname, lastname, email, hashed_password) {
    try {
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
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    checkExistsTeacher,
    checkExistsTeacherNumber,
    getUserByTeacherID,
    createTeacher,
};
