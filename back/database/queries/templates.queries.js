const { pool } = require('../db_connection');

async function getAllTemplates() {
    try {
        const query = await pool.query(`SELECT * FROM survey_templates;`)
        return query.rows; 
    }catch {return null}
}

module.exports = {
    getAllTemplates,
};