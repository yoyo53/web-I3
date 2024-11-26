const {pool} = require('../db_connection.js');

async function getSurveysByTeacherID(id) {
    try {
        const query = await pool.query(`SELECT users.name AS lastname, users.firstname AS firstname,subjects.name AS subject,groups.name AS group
            FROM surveys 
            JOIN modules USING (moduleid) 
            JOIN subjects USING (subjectid) 
            JOIN groups USING (groupid) 
            JOIN teachers USING (teacherid) 
            JOIN users ON users.userid = teachers.teacherid
            WHERE teacher_number = $1`, [id]);
        return query.rows ?? [];
    } catch {
        return null;
    }
}

module.exports = {
    getSurveysByTeacherID
};