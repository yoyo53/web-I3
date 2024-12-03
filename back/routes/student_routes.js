const express = require('express');
const router = express.Router();
const controller = require('../controllers/student.controller');

router.get('/', (req, res) => {
    controller.getStudentName(req, res);
});

router.get('/surveys', (req, res) => {
    controller.getStudentSurveys(req, res);
});

module.exports = router;