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


module.exports = router;
