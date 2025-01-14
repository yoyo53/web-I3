const swaggerJsdoc = require("swagger-jsdoc");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication routes
 *   - name: Admin
 *     description: Admin routes
 *   - name: Teacher
 *     description: Teacher routes
 * 
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
 *         - firstName
 *         - lastName
 *         - email
 *         - accountType
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
 *     SurveyByID:
 *       type: object
 *       properties:
 *         surveyID:
 *           type: integer
 *           description: The unique identifier of the survey.
 *         template_name:
 *           type: string
 *           description: The name of the survey template.
 *         questions:
 *           type: array
 *           description: The list of questions in the survey.
 *           items:
 *             type: object
 *             properties:
 *               questionID:
 *                 type: integer
 *                 description: The unique identifier of the question.
 *               question_text:
 *                 type: string
 *                 description: The text of the question.
 *               question_type:
 *                 type: string
 *                 description: The type of the question (e.g., multiple-choice, open-ended).
 *               options:
 *                 type: array
 *                 description: The possible options for the question (if applicable).
 *                 items:
 *                   type: object
 *                   properties:
 *                     option_text:
 *                       type: string
 *                       description: The text of the option.
 *               answers:
 *                 type: array
 *                 description: The answers provided for the question.
 *                 items:
 *                   type: object
 *                   properties:
 *                     survey_answerID:
 *                       type: integer
 *                       description: The unique identifier of the survey answer.
 *                     answer_text:
 *                       type: string
 *                       description: The text of the answer provided by the student.
 *                     student:
 *                       type: object
 *                       description: Information about the student who provided the answer.
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           description: The first name of the student.
 *                         lastname:
 *                           type: string
 *                           description: The last name of the student.
 *         subject:
 *           type: string
 *           description: The subject of the survey.
 *         group:
 *           type: string
 *           description: The group associated with the survey.
 *         teacher:
 *           type: object
 *           description: Information about the teacher associated with the survey.
 *           properties:
 *             firstname:
 *               type: string
 *               description: The first name of the teacher.
 *             lastname:
 *               type: string
 *               description: The last name of the teacher.
 *       required:
 *         - surveyID
 *         - template_name
 *         - questions
 *         - subject
 *         - group
 *         - teacher
 *       example:
 *         surveyID: 1
 *         template_name: "End of Year Feedback"
 *         questions:
 *           - questionID: 101
 *             question_text: "How would you rate the course overall?"
 *             question_type: "Rating"
 *             options:
 *               - option_text: "Excellent"
 *               - option_text: "Good"
 *               - option_text: "Average"
 *               - option_text: "Poor"
 *             answers:
 *               - survey_answerID: 201
 *                 answer_text: "Excellent"
 *                 student:
 *                   firstname: "Alice"
 *                   lastname: "Johnson"
 *         subject: "Mathematics"
 *         group: "Group A"
 *         teacher:
 *           firstname: "John"
 *           lastname: "Doe"
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
