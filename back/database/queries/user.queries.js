const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function checkExistsUser(email) {
    return await handleErrors(async () => {
        const result = await prisma.users.findFirst({
            where: { email: email },
            select: { userID: true },
        });
        return result !== null;
    });
}

async function getUserByEmailwithPassword(email) {
    return await handleErrors(async () => {
        const result = prisma.users.findUnique({
            where: { email: email },
            select: { userID: true, firstname: true, lastname: true, email: true, hashed_password: true },
        });
        return result;
    });
}

async function getUserById(userID) {
    return await handleErrors(async () => {
        const result = await prisma.users.findUnique({
            where: { userID: userID },
            select: { userID: true, firstname: true, lastname: true, email: true },
        });
        return result;
    });
}

async function getUserPasswordById(userID) {
    return await handleErrors(async () => {
        const result = await prisma.users.findUnique({
            where: { userID: userID },
            select: { hashed_password: true },
        });
        if (result === null) return null;
        return result.hashed_password;
    });
}

async function getUserTypeById(userID) {
    return await handleErrors(async () => {
        const result = await prisma.users.findUnique({
            where: { userID: userID },
            select: {
                admin: { select: { adminID: true } },
                teacher: { select: { teacherID: true } },
                student: { select: { studentID: true } },
            },
        });
        if (result === null) return null;
        else if (result.admin !== null && result.teacher === null && result.student === null) return "Admin";
        else if (result.admin === null && result.teacher !== null && result.student === null) return "Teacher";
        else if (result.admin === null && result.teacher === null && result.student !== null) return "Student";
        else return null;
    });
}

module.exports = {
    checkExistsUser,
    getUserByEmailwithPassword,
    getUserById,
    getUserPasswordById,
    getUserTypeById,
};
