const { prisma } = require('../db.connection')

async function checkExistsUser(email) {
    try {
        return await prisma.users.count({where: {email}}) > 0;
    }
    catch {return false}
}

async function getUserByEmailwithPassword(email) {
    try {
        return await prisma.users.findUnique({
            where: {email},
            select: {userID: true, firstname: true, lastname: true, email: true, hashed_password: true}
        });
    }
    catch {return null}
}

async function getUserByEmail(email) {
    try {
        return await prisma.users.findUnique({
            where: {email},
            select: {userID: true, firstname: true, lastname: true, email: true}
        });
    }
    catch {return null}
}

async function getUserById(id) {
    try {
        return await prisma.users.findUnique({
            where: {userID: id},
            select: {userID: true, firstname: true, lastname: true, email: true}
        });
    }
    catch {return null}
}

async function createUser(firstname, lastname, email, hashed_password) {
    try {
        const query = await prisma.users.create({
            data: {firstname, lastname, email, hashed_password},
            select: {userID: true}
        });
        return query.userID;
    }
    catch {return null}
}

async function updateUser(userID, {firstname, lastname, email, hashed_password}) {
    try {
        const query = await prisma.users.update({
            where: {userID: userID},
            data: {firstname, lastname, email, hashed_password},
            select: {userID: true}
        });
        return query.userID;     
    }
    catch {return null}
}

async function updatePassword(userID, hashed_password) {
    try {
        const query = await prisma.users.update({
            where: {userID: userID},
            data: {hashed_password},
            select: {userID: true}
        });
        return query.userID;    
    }
    catch {return null}
}

async function deleteUser(id) {
    try {
        const query = await prisma.users.delete({
            where: {userID: id},
            select: {userID: true}
        });
        return query.userID;
    }
    catch {return null}
}

module.exports = {
    checkExistsUser,
    getUserByEmailwithPassword,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    updatePassword,
    deleteUser
}