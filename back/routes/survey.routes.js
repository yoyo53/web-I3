const express = require('express');
const router = express.Router();
const surveyController = require('../controllers/survey.controller.js');
const securityMiddleware = require('../middlewares/security.js')


router.get('/:id', securityMiddleware.verifyToken, surveyController.getSurveyByID);

router.post('/createfromtemplate', surveyController.createSurveyFromTemplate);
router.post('/createfromnothing', surveyController.createSurveyFromNothing);

module.exports = router;