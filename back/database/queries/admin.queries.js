const { pool } = require('../db_connection')

async function checkExistsAdmin(adminid) {
    try {
        const query = await pool.query('SELECT count(*) FROM admins WHERE adminid = $1', [adminid]);
        return query.rows[0]?.count > 0;
    }
    catch {return false}
}

module.exports = {
    checkExistsAdmin
}