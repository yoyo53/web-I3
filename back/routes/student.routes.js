const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Routes for student operations
 */

/**
 * @swagger
 * /student/surveys:
 *   get:
 *     summary: Get all surveys for a student
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of surveys assigned to the student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surveyID:
 *                     type: integer
 *                     description: The unique identifier of the survey.
 *                   subject:
 *                     type: string
 *                     description: The subject of the survey.
 *                   group:
 *                     type: string
 *                     description: The group to which the survey is assigned.
 *                   teacher:
 *                     type: object
 *                     description: Information about the teacher.
 *                     properties:
 *                       firstname:
 *                         type: string
 *                         description: Teacher's first name.
 *                       lastname:
 *                         type: string
 *                         description: Teacher's last name.
 *       500:
 *         description: Error while fetching surveys.
 */
router.get("/surveys", studentController.getStudentSurveys);

/**
 * @swagger
 * /student/surveys/{id}:
 *   get:
 *     summary: Get a specific survey by ID
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the survey to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Details of the specific survey
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyByID'
 *       500:
 *         description: Error while fetching survey.
 */
router.get("/surveys/:id", studentController.getSurveyByID);

/**
 * @swagger
 * /student/answertosurvey:
 *   post:
 *     summary: Submit answers to a survey
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surveyID:
 *                 type: integer
 *                 description: The ID of the survey being answered.
 *               answers:
 *                 type: array
 *                 description: A list of answers provided by the student.
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionID:
 *                       type: integer
 *                       description: The ID of the question being answered.
 *                     answer_text:
 *                       type: string
 *                       description: The answer provided by the student.
 *     responses:
 *       200:
 *         description: Survey answered successfully.
 *       400:
 *         description: Missing required parameters (surveyID, studentID, answers).
 *       500:
 *         description: Error while answering survey.
 */
router.post("/surveys/:id/answer", studentController.answerSurvey);

module.exports = router;
