const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller.js');
const securityMiddleware = require('../middlewares/security')

router.get('/surveys', securityMiddleware.verifyToken, studentController.getStudentSurveys);

router.get('/surveys/:id', securityMiddleware.verifyToken, studentController.getSurveyByID);

router.post('/answertosurvey', securityMiddleware.verifyToken, studentController.answerToSurvey);

module.exports = router;