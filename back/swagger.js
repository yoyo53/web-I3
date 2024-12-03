const swaggerJsdoc = require("swagger-jsdoc");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 * 
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin routes
 * 
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher routes
 * 
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name
 *         lastName:
 *           type: string
 *           description: The user's last name
 *         email:
 *           type: string
 *           description: The user's email
 *         accountType:
 *           type: string
 *           description: The user's account type
 *           enum: [Teacher, Student]
 *       example:
 *         firstName: "John"
 *         lastName: "Doe"
 *         email: "john.doe@mail.com"
 *         accountType: "Teacher"
 *       required:
 *       - firstName
 *       - lastName
 *       - email
 *       - accountType
 *     Survey:
 *       type: object
 *       properties:
 *         surveyid:
 *           type: integer
 *           description: The survey ID
 *         lastname:
 *           type: string
 *           description: The teacher's last name
 *         firstname:
 *           type: string
 *           description: The teacher's first name
 *         subject:
 *           type: string
 *           description: The subject of the survey
 *         group:
 *           type: string
 *           description: The group of the survey
 *       example:
 *         surveyid: 1
 *         lastname: "Doe"
 *         firstname: "John"
 *         subject: "Math"
 *         group: "A"
 *   securitySchemes:
 *     adminToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const specs = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TeachPoint API",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
    },
    apis: ["./swagger.js", "./routes/*.js"],
});

module.exports = specs;
