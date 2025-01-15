const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

/**
 * @swagger
 * /admin/surveys:
 *   get:
 *     summary: Get all surveys
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Get all surveys
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Survey'
 *       500:
 *         description: Error while fetching surveys
 */
router.get("/surveys", adminController.getAdminSurveys);

/**
 * @swagger
 * /admin/surveys/{id}:
 *   get:
 *     summary: Get a survey by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The survey ID
 *     responses:
 *       200:
 *         description: Get a survey by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SurveyByID'
 *       500:
 *         description: Error while fetching the survey
 */
router.get("/surveys/:id", adminController.getSurveyByID);

/**
 * @swagger
 * /admin/surveys/{id}:
 *   delete:
 *     summary: Delete a survey by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The survey ID
 *     responses:
 *       200:
 *         description: Survey deleted successfully
 *       500:
 *         description: Error while deleting the survey
 */
router.delete("/survey/:id", adminController.deleteSurveyByID);

/**
 * @swagger
 * /admin/templates:
 *   get:
 *     summary: Get all survey templates
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Get all survey templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error while fetching templates
 */
router.get("/templates", adminController.getSurveyTemplates);

/**
 * @swagger
 * /admin/templates/create:
 *   post:
 *     summary: Post a new survey template
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Survey template created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/templates/create", adminController.createTemplate);

/**
 * @swagger
 * /admin/templates/{id}:
 *   get:
 *     summary: Get a survey template by ID
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The survey template ID
 *     responses:
 *       200:
 *         description: Get a survey template by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error while fetching the template
 */
router.get("/templates/:id", adminController.getTemplateByID);

/**
 * @swagger
 * /admin/modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Get all modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error while fetching modules
 */
router.get("/modules", adminController.getAllModules);

/**
 * @swagger
 * /admin/createfromtemplate:
 *   post:
 *     summary: Create a survey from a template
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Survey created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/createfromtemplate", adminController.createSurveyFromTemplate);

/**
 * @swagger
 * /admin/createfromnothing:
 *   post:
 *     summary: Create a survey from scratch
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Survey created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/createfromnothing", adminController.createSurveyFromNothing);

router.delete("/template/:id", adminController.deleteTemplateByID);

module.exports = router;
