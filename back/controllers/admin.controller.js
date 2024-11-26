const queries = require('../database/queries/admin.queries');

async function getAdminSurveys(req, res) {
    const surveys = await queries.getAllSurveys()
    if (surveys != null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching surveys');
    }
}

module.exports = {
    getAdminSurveys,
};