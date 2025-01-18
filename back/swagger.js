const swaggerJsdoc = require("swagger-jsdoc");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     adminToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use this token to access admin routes.
 *     teacherToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use this token to access teacher routes.
 *     studentToken:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Use this token to access student routes.
 */

const specs = swaggerJsdoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "TeachPoint API",
            version: "1.0.0",
            description: "API for TeachPoint Web Application",
        },
    },
    apis: ["./swagger.js", "./routes/*.js"],
});

module.exports = specs;
