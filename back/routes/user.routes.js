const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Routes for user operations
 */

/**
 * @swagger
 * /user/data:
 *   get:
 *     summary: Get user data
 *     tags:
 *       - User
 *     security:
 *       - adminToken: []
 *       - teacherToken: []
 *       - studentToken: []
 *     responses:
 *       200:
 *         description: Get user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Student / Teacher number (Absent for admins)
 *                 firstname:
 *                   type: string
 *                   description: User first name
 *                 lastname:
 *                   type: string
 *                   description: User last name
 *                 email:
 *                   type: string
 *                   description: User email
 *               required:
 *                 - firstname
 *                 - lastname
 *                 - email
 *               example:
 *                 id: 123456
 *                 firstname: "John"
 *                 lastname: "Doe"
 *                 email: "john.doe@mail.com"
 *       400:
 *         description: Bad request - Invalid or missing data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Internal server error
 */
router.get("/data", userController.getUserData);

module.exports = router;
