const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');
const securityMiddleware = require('../middlewares/security')

router.get('/', securityMiddleware.verifyToken, controller.getStudentName);

router.get('/surveys', securityMiddleware.verifyToken, controller.getStudentSurveys);

module.exports = router;