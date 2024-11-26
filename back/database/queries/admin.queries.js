const { pool } = require('../db_connection');


async function getAllSurveys() {
    try {
        const query = await pool.query(`SELECT users.name AS lastname, users.firstname AS firstname,subjects.name AS subject,groups.name AS group 
                                        FROM surveys JOIN modules USING (moduleid) 
                                        JOIN subjects USING (subjectid) 
                                        JOIN groups USING (groupid) 
                                        JOIN teachers USING (teacherid) 
                                        JOIN users ON users.userid = teachers.teacherid;`)
        return query.rows ?? null; 
    }catch {return null}
}

async function checkExistsAdmin(adminid) {
    try {
        const query = await pool.query('SELECT count(*) FROM admins WHERE adminid = $1', [adminid]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

module.exports = {
    checkExistsAdmin,
    getAllSurveys
}
