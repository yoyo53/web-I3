const { prisma } = require('../db.connection')

async function checkExistsAdmin(adminID) {
    try {
        return await prisma.admins.count({where: {adminID}}) > 0;
    }
    catch {return false}
}

module.exports = {
    checkExistsAdmin
}