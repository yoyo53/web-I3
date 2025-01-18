const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Routes for teacher operations
 */

/**
 * @swagger
 * /teacher/surveys:
 *   get:
 *     summary: Get all surveys for a teacher
 *     tags:
 *       - Teacher
 *     security:
 *       - teacherToken: []
 *     responses:
 *       200:
 *         description: Get all surveys for a teacher
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
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a teacher
 *       500:
 *         description: Internal server error
 */
router.get("/surveys", teacherController.getTeacherSurveys);

/**
 * @swagger
 * /teacher/surveys/{id}:
 *   get:
 *     summary: Get a survey by ID
 *     tags:
 *       - Teacher
 *     security:
 *       - teacherToken: []
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
 *                       options:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             option_text:
 *                               type: string
 *                               description: Option text
 *                       answers:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             survey_answerID:
 *                               type: integer
 *                               description: Survey answer ID
 *                             answer_text:
 *                               type: string
 *                               description: Answer text
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
 *                   answers:
 *                     - answer_text: "Yes"
 *               teacher:
 *                 firstname: "John"
 *                 lastname: "Doe"
 *               subject: "Math"
 *               group: "A"
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not a teacher
 *       500:
 *          description: Internal server error
 */
router.get("/surveys/:id", teacherController.getSurveyByID);

module.exports = router;
