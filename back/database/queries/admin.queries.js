const { pool } = require('../db_connection');


async function getAllSurveys() {
    try {
        const query = await pool.query(`SELECT surveys.surveyid AS surveyid, users.name AS lastname, users.firstname AS firstname,subjects.name AS subject,groups.name AS group 
                                        FROM surveys JOIN modules USING (moduleid) 
                                        JOIN subjects USING (subjectid) 
                                        JOIN groups USING (groupid) 
                                        JOIN teachers USING (teacherid) 
                                        JOIN users ON users.userid = teachers.teacherid;`)
        return query.rows; 
    }catch {return null}
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
