const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Routes for admin operations
 */

/**
 * @swagger
 * /admin/modules:
 *   get:
 *     summary: Get all modules
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     responses:
 *       200:
 *         description: Get all modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   moduleID:
 *                     type: string
 *                     description: Module ID
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
 *                     description: Module subject
 *                   group:
 *                     type: string
 *                     description: Module group
 *                 example:
 *                   moduleID: 1
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
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.get("/modules", adminController.getAllModules);

/**
 * @swagger
 * /admin/templates:
 *   get:
 *     summary: Get all templates
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     responses:
 *       200:
 *         description: Get all templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   templateID:
 *                     type: string
 *                     description: Template ID
 *                   name:
 *                     type: string
 *                     description: Template name
 *                 example:
 *                   templateID: 1
 *                   name: "Template 1"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.get("/templates", adminController.getAllTemplates);

/**
 * @swagger
 * /admin/templates/{id}:
 *   get:
 *     summary: Get a template by ID
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Template ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get a template by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 templateID:
 *                   type: integer
 *                   description: Template ID
 *                 name:
 *                   type: string
 *                   description: Template name
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
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
 *             example:
 *               templateID: 1
 *               name: "Template 1"
 *               questions:
 *                 - question_text: "Was the teacher clear in explaining the subject?"
 *                   question_type: "radio"
 *                   options:
 *                     - option_text: "Yes"
 *                     - option_text: "No"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Template not found
 *       500:
 *          description: Internal server error
 */
router.get("/templates/:id", adminController.getTemplateByID);

/**
 * @swagger
 * /admin/templates/create:
 *   post:
 *     summary: Create a template
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Template name
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_text:
 *                       type: string
 *                       description: Question text
 *                     question_type:
 *                       type: string
 *                       description: Question type
 *                       enum:
 *                         - text
 *                         - radio
 *                         - checkbox
 *                         - score
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           option_text:
 *                             type: string
 *                             description: Option text
 *             example:
 *               name: "Template 1"
 *               questions:
 *                 - question_text: "Was the teacher clear in explaining the subject?"
 *                   question_type: "radio"
 *                   options:
 *                     - option_text: "Yes"
 *                     - option_text: "No"
 *             required:
 *               - name
 *               - questions
 *     responses:
 *       201:
 *         description: Create a template
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 templateID:
 *                   type: integer
 *                   description: Template ID
 *               example:
 *                 templateID: 1
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.post("/templates/create", adminController.createTemplate);

/**
 * @swagger
 * /admin/templates/{id}:
 *   delete:
 *     summary: Delete a template by ID
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Template ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Delete a template by ID
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *          description: Internal server error
 */
router.delete("/templates/:id", adminController.deleteTemplateByID);

/**
 * @swagger
 * /admin/surveys:
 *   get:
 *     summary: Get all surveys
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
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
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.get("/surveys", adminController.getAdminSurveys);

/**
 * @swagger
 * /admin/surveys/{id}:
 *   get:
 *     summary: Get a survey by ID
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
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
 *                             student:
 *                               type: object
 *                               properties:
 *                                 firstname:
 *                                   type: string
 *                                   description: Student first name
 *                                 lastname:
 *                                   type: string
 *                                   description: Student last name
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
 *                       student:
 *                         firstname: "Jane"
 *                         lastname: "Doe"
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
 *         description: Forbidden - User is not an admin
 *       404:
 *         description: Survey not found
 *       500:
 *          description: Internal server error
 */
router.get("/surveys/:id", adminController.getSurveyByID);

/**
 * @swagger
 * /admin/surveys/create:
 *   post:
 *     summary: Create a survey from a template
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleID:
 *                 type: integer
 *                 description: Module ID
 *               templateID:
 *                 type: integer
 *                 description: Template ID
 *             example:
 *               moduleID: 1
 *               templateID: 1
 *             required:
 *               - moduleID
 *               - templateID
 *     responses:
 *       201:
 *         description: Create a survey from a template
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 surveyID:
 *                   type: integer
 *                   description: Survey ID
 *               example:
 *                 surveyID: 1
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.post("/surveys/create", adminController.createSurveyFromTemplate);

/**
 * @swagger
 * /admin/surveys/create/custom:
 *   post:
 *     summary: Create a survey from scratch
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Template name
 *               moduleID:
 *                 type: integer
 *                 description: Module ID
 *               questions:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question_text:
 *                       type: string
 *                       description: Question text
 *                     question_type:
 *                       type: string
 *                       description: Question type
 *                       enum:
 *                         - text
 *                         - radio
 *                         - checkbox
 *                         - score
 *                     options:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           option_text:
 *                             type: string
 *                             description: Option text
 *             example:
 *               name: "Template 1"
 *               moduleID: 1
 *               questions:
 *                 - question_text: "Was the teacher clear in explaining the subject?"
 *                   question_type: "radio"
 *                   options:
 *                     - option_text: "Yes"
 *                     - option_text: "No"
 *             required:
 *               - name
 *               - moduleID
 *               - questions
 *     responses:
 *       201:
 *         description: Survey created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 surveyID:
 *                   type: integer
 *                   description: Survey ID
 *               example:
 *                 surveyID: 1
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal server error
 */
router.post("/surveys/create/custom", adminController.createSurveyFromNothing);

/**
 * @swagger
 * /admin/surveys/{id}:
 *   delete:
 *     summary: Delete a survey by ID
 *     tags:
 *       - Admin
 *     security:
 *       - adminToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Survey ID
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Delete a survey by ID
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *          description: Internal server error
 */
router.delete("/surveys/:id", adminController.deleteSurveyByID);

module.exports = router;
