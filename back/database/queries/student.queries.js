const { pool } = require('../db_connection')

async function checkExistsStudent(studentid) {
    try {
        const query = await pool.query('SELECT count(*) FROM students WHERE studentid = $1', [studentid]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

async function checkExistsStudentNumber(student_number) {
    try {
        const query = await pool.query('SELECT count(*) FROM students WHERE student_number = $1', [student_number]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

async function getUserByStudentNumber(student_number) {
    try {
        const query = await pool.query(`SELECT users.userID, users.name, users.firstname, users.email, students.studentid, students.student_number FROM users 
            JOIN students ON users.userID = students.studentid 
            WHERE students.student_number = $1`, [student_number]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function getUserByStudentID(id) {
    try {
        const query = await pool.query(`SELECT users.userID, users.name, users.firstname, users.email, students.studentid, students.student_number FROM users 
            JOIN students ON users.userID = students.studentid 
            WHERE students.studentid = $1`, [id]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function createStudent(userID, student_number) {
    try {
        const query = await pool.query('INSERT INTO students (studentid, student_number) VALUES ($1, $2) RETURNING studentid', [userID, student_number]);
        return query.rows[0]?.studentid ?? null;
    }
    catch {return null}
}

async function updateStudent(id, student_number) {
    try {
        const query = await pool.query('UPDATE students SET student_number = $2 WHERE studentid = $1 RETURNING studentid', [id, student_number]);
        return query.rows[0]?.studentid ?? null;
    }
    catch {return null}
}

async function deleteStudent(id) {
    try {
        await pool.query('DELETE FROM students WHERE studentid = $1', [id]);
        return true;
    }
    catch {return false}
}

module.exports = {
    checkExistsStudent,
    checkExistsStudentNumber,
    getUserByStudentNumber,
    getUserByStudentID,
    createStudent,
    updateStudent,
    deleteStudent
}