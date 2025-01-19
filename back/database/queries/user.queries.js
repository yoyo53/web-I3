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

module.exports = {
    checkExistsUser,
    getUserByEmailwithPassword,
    getUserById,
};
