const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller.js');

/**
 * @swagger
 * /teacher/surveys:
 *   get:
 *     summary: Get all surveys for a teacher
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Get all surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error while fetching surveys
 */
router.get('/surveys', teacherController.getTeacherSurveys);

router.get('/surveys/:id', teacherController.getSurveyByID);

module.exports = router;