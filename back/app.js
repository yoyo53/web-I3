const express = require("express");
const { json } = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const securityMiddleware = require("./middlewares/security");
const { DatabaseError, ConnectionError, ValidationError } = require("./database/db.errors");

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "X-Requested-With,Content-Type,Authorization",
    }),
);

app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use((error, request, response, next) => {
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        console.error("Invalid JSON:", error.message);
        response.status(400).json({ error: "invalid JSON" });
    } else if (error instanceof ConnectionError) {
        console.error("Database connection error:", error.message);
        response.status(500).json({ error: "database connection error" });
    } else if (error instanceof ValidationError) {
        console.error("Validation error:", error.message);
        response.status(400).json({ error: "invalid or missing data" });
    } else if (error instanceof DatabaseError) {
        console.error("Database error:", error.message);
        response.status(500).json({ error: "unknown database error" });
    } else if (error instanceof Error) {
        console.error("Unknown error:", error.message);
        response.status(500).json({ error: "unknown error" });
    } else {
        next();
    }
});

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.ip} - ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("API of TeachPoint with Express.js and Prisma");
});

app.use("/auth", require("./routes/auth.routes"));

app.use("/user", securityMiddleware.verifyToken, require("./routes/user.routes"));

app.use("/admin", securityMiddleware.verifyAdminToken, require("./routes/admin.routes"));

app.use("/teacher", securityMiddleware.verifyTeacherToken, require("./routes/teacher.routes"));

app.use("/student", securityMiddleware.verifyStudentToken, require("./routes/student.routes"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

module.exports = {
    app,
};
