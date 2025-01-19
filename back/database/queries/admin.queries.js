const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function checkExistsAdmin(adminID) {
    return await handleErrors(async () => {
        const result = await prisma.admins.findFirst({
            where: { adminID: adminID },
            select: { adminID: true },
        });
        return result !== null;
    });
}

module.exports = {
    checkExistsAdmin,
};
