const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const securityMiddleware = require("../middlewares/security");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Routes for authentication operations
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Auth
 *     security:
 *       - adminToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: User first name
 *               lastname:
 *                 type: string
 *                 description: User last name
 *               email:
 *                 type: string
 *                 description: User email
 *               account_number:
 *                 type: integer
 *                 description: User account number
 *               account_type:
 *                 type: string
 *                 description: User account type
 *                 enum:
 *                   - Teacher
 *                   - Student
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - account_number
 *               - account_type
 *             example:
 *               firstname: "John"
 *               lastname: "Doe"
 *               email: "john.doe@mail.com"
 *               account_number: 123456
 *               account_type: "Teacher"
 *     responses:
 *       201:
 *         description: Create a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userID:
 *                   type: integer
 *                   description: User ID
 *               example:
 *                 userID: 1
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User is not an admin
 *       409:
 *         description: Conflict - Email or student number already taken
 *       500:
 *         description: Internal server error
 */
router.post("/register", securityMiddleware.verifyAdminToken, authController.createUserAction);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               password:
 *                 type: string
 *                 description: User password
 *             example:
 *               email: "john.doe@mail.com"
 *               password: "password"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Log in a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: User token
 *                 user_type:
 *                   type: string
 *                   description: User type
 *                   enum:
 *                     - Admin
 *                     - Teacher
 *                     - Student
 *               example:
 *                 token: "token"
 *                 user_type: "Teacher"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid email or password
 *       500:
 *         description: Internal server error
 */
router.post("/login", authController.loginUserAction);

/**
 * @swagger
 * /auth/verifyToken:
 *   get:
 *     summary: Verify user token
 *     tags:
 *       - Auth
 *     security:
 *       - adminToken: []
 *       - teacherToken: []
 *       - studentToken: []
 *     responses:
 *       200:
 *         description: Verify user token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_type:
 *                   type: string
 *                   description: User type
 *                   enum:
 *                     - Admin
 *                     - Teacher
 *                     - Student
 *               example:
 *                 user_type: "Teacher"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get("/verifyToken", securityMiddleware.verifyToken, authController.verifyTokenAction);

module.exports = router;
