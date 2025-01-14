const queries = require('../database/queries/student.queries.js');

async function getStudentSurveys(req, res) {
    const surveys = await queries.getSurveysByStudentID(req.user_id);
    console.log(surveys);
    if (surveys !== null) {
        res.status(200).json(surveys);
    } else {
        res.status(500).send('Error while fetching surveys');
    }
}

async function getSurveyByID(req, res) {
    const survey = await queries.getSurveyByID(req.params.id);
    console.log(survey);
    if (survey !== null) {
        res.status(200).json(survey);
    } else {
        res.status(500).send('Error while fetching survey');
    }
}

async function answerToSurvey(req, res) {
    const surveyID = req.body.surveyID;
    const studentID = req.user_id;
    const answers = req.body.answers;
    
    // SurveyID, studentID, answers are required
    if (!surveyID || !studentID || !answers) {
        res.status(400).json({error: 'SurveyID, studentID, answers are required'});
        return;
    }

    // res.status(200).send('Survey answered');
    const result = await queries.answerToSurvey(surveyID, studentID, answers);
    if (result) {
        res.status(200).json({info: 'Survey answered'});
    } else {
        res.status(500).json({error: 'Error while answering survey'});
    }
}

module.exports = {
    getStudentSurveys, 
    getSurveyByID,
    answerToSurvey
};