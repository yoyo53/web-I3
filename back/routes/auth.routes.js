const express = require('express');
const router = express.Router();
const authActions = require('../controllers/auth.controller.js');
const securityMiddleware = require('../middlewares/security')
const adminAccess = require('../middlewares/adminAccess')

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security:
 *       - adminToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/register", adminAccess.adminToken, authActions.createUserAction);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: "john.doe@mail.com"
 *               password: "password"
 *             required:
 *             - email
 *             - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/login", authActions.loginUserAction);

/**
 * @swagger
 * /auth/verifyToken:
 *   get:
 *     summary: Verify user token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Token is invalid
 *       500:
 *         description: Internal server error
 */
router.get("/verifyToken", securityMiddleware.verifyToken, authActions.verifyTokenAction);

module.exports = router;
