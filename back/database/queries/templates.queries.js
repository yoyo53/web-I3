const { prisma } = require('../db.connection');

async function getAllTemplates() {
    try {
        const query = await prisma.survey_templates.findMany();
        return query.rows; 
    }catch {return null}
}

module.exports = {
    getAllTemplates,
};