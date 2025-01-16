const request = require("supertest");
const express = require("express");
const authRoutes = require("../../../routes/auth.routes");
const authActions = require("../../../controllers/auth.controller");
const securityMiddleware = require("../../../middlewares/security");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

jest.mock("../../../controllers/auth.controller");
jest.mock("../../../middlewares/security");

describe("auth routes", () => {
    describe("POST /auth/register", () => {
        it("should register a new user", async () => {
            securityMiddleware.verifyAdminToken.mockImplementation((req, res, next) => next());
            authActions.createUserAction.mockImplementation((req, res) =>
                res.status(200).json({ info: "user created successfully" }),
            );

            const response = await request(app).post("/auth/register").send({
                firstName: "john",
                lastName: "doe",
                email: "john.doe@mail.com",
                accountType: "Teacher",
                accountNumber: "1",
            });

            expect(response.status).toBe(200);
        });

        it("should return 401 if the user is not an admin", async () => {
            securityMiddleware.verifyAdminToken.mockImplementation((req, res) =>
                res.status(401).json({ error: "Unauthorized" }),
            );

            const response = await request(app).post("/auth/register").send({
                firstName: "john",
                lastName: "doe",
                email: "john.doe@mail.com",
                accountType: "Teacher",
                accountNumber: "1",
            });

            expect(response.status).toBe(401);
        });

        it("should return 500 if the user creation fail", async () => {
            securityMiddleware.verifyAdminToken.mockImplementation((req, res, next) => next());
            authActions.createUserAction.mockImplementation((req, res) =>
                res.status(500).json({ info: "user creation failed" }),
            );

            const response = await request(app).post("/auth/register").send({
                firstName: "john",
                lastName: "doe",
                email: "john.doe@mail.com",
                accountType: "Teacher",
                accountNumber: "1",
            });

            expect(response.status).toBe(500);
        });
    });

    describe("POST /auth/login", () => {
        it("should return 400 if the password is incorrect", async () => {
            authActions.loginUserAction.mockImplementation((req, res) => res.status(400).json({ token: null }));

            const response = await request(app).post("/auth/login").send({
                email: "john.doe@mail.com",
                password: "password",
            });

            expect(response.status).toBe(400);
            expect(response.body.token).toBe(null);
        });

        it("should login a user", async () => {
            authActions.loginUserAction.mockImplementation((req, res) =>
                res.status(200).json({ token: "fake-jwt-token", user_id: 1, user_type: "Teacher" }),
            );

            const response = await request(app).post("/auth/login").send({
                email: "john.doe@mail.com",
                password: "password",
            });

            expect(response.status).toBe(200);
            expect(response.body.token).not.toBe(null);
            expect(response.body.user_id).not.toBe(null);
        });

        it("should return 400 if the user dont exist", async () => {
            authActions.loginUserAction.mockImplementation((req, res) =>
                res.status(400).json({ error: "invalid request" }),
            );

            const response = await request(app).post("/auth/login").send({
                email: "john.doe@mail.com",
                password: "password",
            });

            expect(response.status).toBe(400);
        });

        it("should return 400 if the token generation has failed", async () => {
            authActions.loginUserAction.mockImplementation((req, res) =>
                res.status(400).json({ error: "invalid request" }),
            );

            const response = await request(app).post("/auth/login").send({
                email: "john.doe@mail.com",
                password: "password",
            });

            expect(response.status).toBe(400);
        });
    });

    describe("GET /auth/verifyToken", () => {
        it("should verify token", async () => {
            securityMiddleware.verifyToken.mockImplementation((req, res, next) => {
                req.user_id = 1;
                req.user_type = "Teacher";
                next();
            });
            authActions.verifyTokenAction.mockImplementation((req, res) =>
                res.status(200).json({ user_id: req.user_id, user_type: req.user_type }),
            );

            const response = await request(app).get("/auth/verifyToken").set("Authorization", "Bearer fake-jwt-token");

            expect(response.status).toBe(200);
            expect(response.body.user_id).toBe(1);
            expect(response.body.user_type).toBe("Teacher");
        });

        it("should return 401 if token is invalid", async () => {
            securityMiddleware.verifyToken.mockImplementation((req, res) =>
                res.status(401).json({ error: "Token is invalid" }),
            );

            const response = await request(app).get("/auth/verifyToken").set("Authorization", "Bearer invalid-token");

            expect(response.status).toBe(401);
            expect(response.body.error).toBe("Token is invalid");
        });
    });
});
