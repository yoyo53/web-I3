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
  controller.createSurveyTemplate(req, res);
});

/**
 * @swagger
 * /admin/templates/{id}:
 *   get:
 *     summary: Get a survey template by id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Survey template id
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Get a survey template by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
 *         description: Error while fetching template
 */
router.get('/template/:id', (req, res) => {
  controller.getQuestionTemplate(req, res);
});

module.exports = router;
