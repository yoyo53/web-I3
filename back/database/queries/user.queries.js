const { prisma } = require("../db.connection");

async function checkExistsUser(email) {
    try {
        const result = await prisma.users.findFirst({
            where: { email: email },
            select: { userID: true },
        });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function getUserByEmailwithPassword(email) {
    try {
        return await prisma.users.findUnique({
            where: { email: email },
            select: { userID: true, firstname: true, lastname: true, email: true, hashed_password: true },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getUserById(userID) {
    try {
        return await prisma.users.findUnique({
            where: { userID: userID },
            select: { userID: true, firstname: true, lastname: true, email: true },
        });
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    checkExistsUser,
    getUserByEmailwithPassword,
    getUserById,
};
