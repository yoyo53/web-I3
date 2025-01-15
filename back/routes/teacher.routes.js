const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller');

/**
 * @swagger
 * /teacher/surveys:
 *   get:
 *     summary: Get all surveys for a teacher
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         description: Get all surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Survey ID
 *                   title:
 *                     type: string
 *                     description: Survey title
 *       500:
 *         description: Error while fetching surveys
 */
router.get('/surveys', teacherController.getTeacherSurveys);

/**
 * @swagger
 * /teacher/surveys/{id}:
 *   get:
 *     summary: Get a survey by ID
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the survey to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get a survey by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Survey ID
 *                 title:
 *                   type: string
 *                   description: Survey title
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       question_id:
 *                         type: integer
 *                         description: Question ID
 *                       question_text:
 *                         type: string
 *                         description: Question text
 *       500:
 *         description: Error while fetching survey
 */
router.get('/surveys/:id', teacherController.getSurveyByID);

module.exports = router;
