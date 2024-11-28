const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller.js');
const securityMiddleware = require('../middlewares/security')

router.get('/', (req, res) => {
    res.send('Teacher route');
  });

router.get('/surveys', securityMiddleware.verifyToken, teacherController.getTeacherSurveys);

module.exports = router;