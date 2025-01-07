const { prisma } = require('../db.connection');


async function checkExistsAdmin(adminID) {
    try {
        return await prisma.admins.count({where: {adminID}}) > 0;
    }
    catch {return false}
}

async function getAllModules() {
    try {
        const result = await prisma.modules.findMany({
            select: {
                moduleID: true,
                teacher: {
                    select: {
                        teacherID: true,
                        user: {
                            select: {
                                firstname: true,
                                lastname: true,
                            },
                        },
                    },
                },
                group: {
                    select: {
                        name: true,
                    },
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return result.map((module) => ({
            moduleID: module.moduleID,
            teacher_firstname: module.teacher.user.firstname,
            teacher_lastname: module.teacher.user.lastname,
            group: module.group.name,
            subject: module.subject.name,
        }));
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    checkExistsAdmin,
    getAllModules
}
