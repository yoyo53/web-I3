const express = require("express");
const { json } = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swagger");
const securityMiddleware = require("./middlewares/security");

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "X-Requested-With,Content-Type,Authorization",
    }),
);

// Middleware for parsing application/json
app.use(json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling JSON errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        console.error("Bad JSON format:", err.message);
        return res.status(400).send({ error: "Bad JSON format" });
    }
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
