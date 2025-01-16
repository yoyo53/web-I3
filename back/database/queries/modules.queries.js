const { prisma } = require("../db.connection");

async function getAllModules() {
    try {
        const result = await prisma.modules.findMany({
            select: {
                moduleID: true,
                teacher: { select: { teacherID: true, user: { select: { firstname: true, lastname: true } } } },
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
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    getAllModules,
};
