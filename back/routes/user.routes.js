const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const securityMiddleware = require('../middlewares/security')

/**
 * @swagger
 * /user/data:
 *   get:
 *     summary: Retrieve user data
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 firstname:
 *                   type: string
 *                 lastname:
 *                   type: string
 *                 email:
 *                   type: string
 *       500:
 *         description: Internal server error
 */
router.get('/data', securityMiddleware.verifyToken, userController.getUserData);

module.exports = router;