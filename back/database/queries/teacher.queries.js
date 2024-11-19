const { pool } = require('../db_connection')

async function checkExistsTeacher(teacherid) {
    try {
        const query = await pool.query('SELECT count(*) FROM teachers WHERE teacherid = $1', [teacherid]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

async function checkExistsTeacherNumber(teacher_number) {
    try {
        const query = await pool.query('SELECT count(*) FROM teachers WHERE teacher_number = $1', [teacher_number]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

async function getUserByTeacherNumber(teacher_number) {
    try {
        const query = await pool.query(`SELECT users.userID, users.name, users.firstname, users.email, teachers.teacherid, teachers.teacher_number FROM users 
            JOIN teachers ON users.userID = teachers.teacherid 
            WHERE teachers.teacher_number = $1`, [teacher_number]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function getUserByTeacherID(id) {
    try {
        const query = await pool.query(`SELECT users.userID, users.name, users.firstname, users.email, teachers.teacherid, teachers.teacher_number FROM users 
            JOIN teachers ON users.userID = teachers.teacherid 
            WHERE teachers.teacherid = $1`, [id]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}
async function createTeacher(userID, teacher_number) {
    try {
        const query = await pool.query('INSERT INTO teachers (teacherid, teacher_number) VALUES ($1, $2) RETURNING teacherid', [userID, teacher_number]);
        return query.rows[0]?.teacherid ?? null;
    }
    catch {return null}
}
async function updateTeacher(id, teacher_number) {
    try {
        const query = await pool.query('UPDATE teachers SET teacher_number = $2 WHERE teacherid = $1 RETURNING teacherid', [id, teacher_number]);
        return query.rows[0]?.teacherid ?? null;
    }
    catch {return null}
}

async function deleteTeacher(id) {
    try {
        await pool.query('DELETE FROM teachers WHERE teacherid = $1', [id]);
        return true;
    }
    catch {return false}
}

module.exports = {
    checkExistsTeacher,
    checkExistsTeacherNumber,
    getUserByTeacherNumber,
    getUserByTeacherID,
    createTeacher,
    updateTeacher,
    deleteTeacher
}