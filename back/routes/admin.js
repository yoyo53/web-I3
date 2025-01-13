const express = require('express');
const router = express.Router();
const controller = require('../controllers/admin.controller');

/**
 * @swagger
 * /admin:
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
router.get('/', (req, res) => {
  controller.getAdminSurveys(req, res); 
});

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
router.get('/templates', (req, res) => {
  controller.getSurveyTemplates(req, res); 
});


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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/templates/create', (req, res) => {
  controller.createTemplate(req, res);
});

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
 *           type: string
 *         description: The survey template ID
 *     responses:
 *       200:
 *         description: Get a survey template by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Template not found
 *       500:
 *         description: Error while fetching the template
 */
router.get('/templates/:id', (req, res) => {
  controller.getTemplateByID(req, res);
});


/**
 * @swagger
 * /admin/modules:
  *   get:  
 */
router.get('/modules', (req, res) => {
  controller.getAllModules(req, res);
});

router.post('/createfromtemplate', controller.createSurveyFromTemplate);
router.post('/createfromnothing', controller.createSurveyFromNothing);

module.exports = router;
