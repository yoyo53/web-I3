const { prisma } = require("../db.connection");

async function checkExistsStudent(studentID) {
    try {
        const result = await prisma.students.findFirst({
            where: { studentID: studentID },
            select: { studentID: true },
        });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function checkExistsStudentNumber(student_number) {
    try {
        const result = await prisma.students.findFirst({
            where: { student_number: student_number },
            select: { studentID: true },
        });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getUserByStudentID(studentID) {
    try {
        return await prisma.students.findUnique({
            where: { studentID: studentID },
            select: {
                studentID: true,
                student_number: true,
                user: { select: { userID: true, firstname: true, lastname: true, email: true } },
            },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function createStudent(student_number, firstname, lastname, email, hashed_password) {
    try {
        const result = await prisma.students.create({
            data: {
                student_number: student_number,
                user: {
                    create: {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        hashed_password: hashed_password,
                    },
                },
            },
            select: { studentID: true },
        });
        return result.studentID;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    checkExistsStudent,
    checkExistsStudentNumber,
    getUserByStudentID,
    createStudent,
};
