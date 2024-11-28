const { prisma } = require('../db.connection');


async function getAllSurveys() {
    try {
        const surveys = await prisma.surveys.findMany({
            select: {
                surveyid: true,
                teachers: {
                    select: {
                        users: {
                            select: {
                                lastname: true,
                                firstname: true
                            }
                        }
                    }
                },
                modules: {
                    select: {
                        subjects: {
                            select: {
                                name: true
                            }
                        },
                        groups: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return surveys.map(survey => ({
            surveyid: survey.surveyid,
            lastname: survey.teachers.users.lastname,
            firstname: survey.teachers.users.firstname,
            subject: survey.modules.subjects.name,
            group: survey.modules.groups.name
        }));
    }
    catch {return null}
}

async function checkExistsAdmin(adminID) {
    try {
        return await prisma.admins.count({where: {adminID}}) > 0;
    }
    catch {return false}
}

module.exports = {
    getAllSurveys,
    checkExistsAdmin
}
