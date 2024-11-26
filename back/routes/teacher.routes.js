const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller.js');

router.get('/', (req, res) => {
    res.send('Teacher route');
  });

router.get('/surveys', teacherController.getTeacherSurveys);

module.exports = router;