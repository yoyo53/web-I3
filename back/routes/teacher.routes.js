const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher.controller.js');
const securityMiddleware = require('../middlewares/security')

/**
 * @swagger
 * /teacher:
 *   get:
 *     summary: Teacher route
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Teacher route
 */
router.get('/', (req, res) => {
    res.send('Teacher route');
  });

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
router.get('/surveys', securityMiddleware.verifyToken, teacherController.getTeacherSurveys);

module.exports = router;