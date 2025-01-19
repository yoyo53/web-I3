const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function checkExistsStudentNumber(student_number) {
    return await handleErrors(async () => {
        const result = await prisma.students.findFirst({
            where: { student_number: student_number },
            select: { studentID: true },
        });
        return result !== null;
    });
}

async function getUserByStudentID(studentID) {
    return await handleErrors(async () => {
        const result = await prisma.students.findUnique({
            where: { studentID: studentID },
            select: {
                studentID: true,
                student_number: true,
                user: { select: { userID: true, firstname: true, lastname: true, email: true } },
            },
        });
        return result;
    });
}

async function createStudent(student_number, firstname, lastname, email, hashed_password) {
    return await handleErrors(async () => {
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
    });
}

module.exports = {
    checkExistsStudentNumber,
    getUserByStudentID,
    createStudent,
};
