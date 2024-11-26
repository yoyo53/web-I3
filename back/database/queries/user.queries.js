const { pool } = require('../db_connection')

async function checkExistsUser(email) {
    try {
        const query = await pool.query('SELECT count(*) FROM users WHERE email = $1', [email]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

async function getUserByEmailwithPassword(email) {
    try {
        const query = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function getUserByEmail(email) {
    try {
        const query = await pool.query('SELECT name, firstname, email FROM users WHERE email = $1', [email]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function getUserById(id) {
    try {
        const query = await pool.query('SELECT name, firstname, email FROM users WHERE userID = $1', [id]);
        return query.rows[0] ?? null;
    }
    catch {return null}
}

async function createUser(name, email, firstname, hashed_password) {
    try {
        const query = await pool.query('INSERT INTO users (name, email, firstname, hashed_password) VALUES ($1, $2, $3, $4) RETURNING userID', [name, email, firstname, hashed_password]);
        return query.rows[0]?.userid ?? null;        
    }
    catch {return null}
}

async function updateUser(userid, {name, email, firstname, hashed_password}) {
    try {
        const query = await pool.query('UPDATE users SET name = $1, email = $2, firstname = $3, hashed_password = $4 WHERE userID = $5 RETURNING userID', [name, email, firstname, hashed_password, userid]);
        return query.rows[0]?.userID ?? null;        
    }
    catch {return null}
}

async function updatePassword(userid, hashed_password) {
    try {
        const query = await pool.query('UPDATE users SET hashed_password = $1 WHERE userID = $2 RETURNING userID', [hashed_password, userid]);
        return query.rows[0]?.userID ?? null;        
    }
    catch {return null}
}

async function deleteUser(id) {
    try {
        await pool.query('DELETE FROM users WHERE userID = $1', [id]);
        return userID;
    }
    catch {return null}
}

module.exports = {
    checkExistsUser,
    getUserByEmailwithPassword,
    getUserByEmail,
    getUserById,
    createUser,
    updateUser,
    updatePassword,
    deleteUser
}