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
 *     tags:
 *       - Student
 *     security:
 *       - studentToken: []
 *     responses:
 *       200:
 *         description: Get all surveys for a student
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   surveyID:
 *                     type: integer
 *                     description: Survey ID
 *                   teacher:
 *                     type: object
 *                     properties:
 *                       firstname:
 *                         type: string
 *                         description: Teacher first name
 *                       lastname:
 *                         type: string
 *                         description: Teacher last name
 *                   subject:
 *                     type: string
 *                     description: Survey subject
 *                   group:
 *                     type: string
 *                     description: Survey group
 *                 example:
 *                   surveyID: 1
 *                   teacher:
 *                     firstname: "John"
 *                     lastname: "Doe"
 *                   subject: "Math"
 *                   group: "A"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a student
 *       500:
 *         description: Internal server error
 */
router.get("/surveys", studentController.getStudentSurveys);

/**
 * @swagger
 * /student/surveys/{id}:
 *   get:
 *     summary: Get a survey by ID
 *     tags:
 *       - Student
 *     security:
 *       - studentToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Survey ID
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
 *                 surveyID:
 *                   type: integer
 *                   description: Survey ID
 *                 template_name:
 *                   type: string
 *                   description: Template name
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questionID:
 *                         type: integer
 *                         description: Question ID
 *                       question_text:
 *                         type: string
 *                         description: Question text
 *                       question_type:
 *                         type: string
 *                         description: Question type
 *                         enum:
 *                           - text
 *                           - radio
 *                           - checkbox
 *                           - score
 *                       options:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             option_text:
 *                               type: string
 *                               description: Option text
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     firstname:
 *                       type: string
 *                       description: Teacher first name
 *                     lastname:
 *                       type: string
 *                       description: Teacher last name
 *                 subject:
 *                   type: string
 *                   description: Survey subject
 *                 group:
 *                   type: string
 *                   description: Survey group
 *             example:
 *               surveyID: 1
 *               template_name: "Template 1"
 *               questions:
 *                 - questionID: 1
 *                   question_text: "Was the teacher clear in explaining the subject?"
 *                   question_type: "radio"
 *                   options:
 *                     - option_text: "Yes"
 *                     - option_text: "No"
 *               teacher:
 *                 firstname: "John"
 *                 lastname: "Doe"
 *               subject: "Math"
 *               group: "A"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a student
 *       404:
 *         description: Survey not found
 *       500:
 *          description: Internal server error
 */
router.get("/surveys/:id", studentController.getSurveyByID);

/**
 * @swagger
 * /student/surveys/{id}/answer:
 *   post:
 *     summary: Answer a survey
 *     tags:
 *       - Student
 *     security:
 *       - studentToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Survey ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: object
 *                 description: The answers to the survey questions
 *                 additionalProperties:
 *                   type: array
 *                   description: The answers to a question
 *                   items:
 *                     type: string
 *                     description: The answer to a question
 *             example:
 *               answers:
 *                 "1": ["Yes"]
 *             required:
 *               - answers
 *     responses:
 *       201:
 *         description: Answer a survey
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answerID:
 *                   type: integer
 *                   description: The unique identifier of the answer
 *               example:
 *                 answerID: 1
 *       400:
 *         description: Bad request - Invalid or missing answers
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a student
 *       404:
 *         description: Survey not found
 *       500:
 *         description: Internal server error
 */
router.post("/surveys/:id/answer", studentController.answerSurvey);

module.exports = router;
