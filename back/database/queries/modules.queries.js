const { prisma } = require("../db.connection");
const { handleErrors } = require("../db.errors");

async function getAllModules() {
    return await handleErrors(async () => {
        const result = await prisma.modules.findMany({
            select: {
                moduleID: true,
                teacher: { select: { user: { select: { firstname: true, lastname: true } } } },
                subject: { select: { name: true } },
                group: { select: { name: true } },
            },
        });
        return result.map((module) => ({
            moduleID: module.moduleID,
            teacher: {
                firstname: module.teacher.user.firstname,
                lastname: module.teacher.user.lastname,
            },
            subject: module.subject.name,
            group: module.group.name,
        }));
    });
}

module.exports = {
    getAllModules,
};
