const { prisma } = require("../db.connection");

async function checkExistsAdmin(adminID) {
    try {
        const result = await prisma.admins.findFirst({
            where: { adminID: adminID },
            select: { adminID: true },
        });
        return result !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = {
    checkExistsAdmin,
};
