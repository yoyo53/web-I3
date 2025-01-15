import {expect, it, jest} from '@jest/globals';

const request = require('supertest');
const express = require('express');
const authRoutes = require('../../../routes/auth.routes');
const authActions = require('../../../controllers/auth.controller');
const securityMiddleware = require('../../../middlewares/security');
const adminAccess = require('../../../middlewares/adminAccess');
const userQueries = require('../../../database/queries/user.queries');
const teacherQueries = require('../../../database/queries/teacher.queries');
const adminQueries = require('../../../database/queries/admin.queries');
const studentQueries = require('../../../database/queries/student.queries');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

jest.mock('../../../controllers/auth.controller');
jest.mock('../../../middlewares/security');
jest.mock('../../../middlewares/adminAccess');

describe('auth routes', () => {
    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            adminAccess.adminToken.mockImplementation((req, res, next) => next());
            authActions.createUserAction.mockImplementation((req, res) => res.status(200).json({ info: 'user created successfully' }));

            const response = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@mail.com',
                    accountType: 'Teacher',
                    accountNumber: '12345'
                });

            expect(response.status).toBe(200);
        });

        it('should return 400 if the teacher number is already taken', async () => {
            adminAccess.adminToken.mockImplementation((req, res, next) => next());
            teacherQueries.checkExistsTeacherNumber.mockImplementation(() => false);

            const response = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@email.com',
                    accountType: 'Teacher',
                    accountNumber: '12345'
                });

            expect(response.status).toBe(400);
        });

        it('should return 400 if the user creation fail', async () => {
            adminAccess.adminToken.mockImplementation((req, res, next) => next());
            userQueries.createUser.mockImplementation(() => null);

            const response = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@email.com', 
                    accountType: 'Teacher',
                    accountNumber: '12345'
                });

            expect(response.status).toBe(400);
        });

        it('should return 400 if the teacher creation fail', async () => {
            adminAccess.adminToken.mockImplementation((req, res, next) => next());
            teacherQueries.createTeacher.mockImplementation(() => null);

            const response = await request(app)
                .post('/auth/register')
                .send({
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@email.com', 
                    accountType: 'Teacher',
                    accountNumber: '12345'
                });

            expect(response.status).toBe(400);
        });
    });

    describe('POST /auth/login', () => {
        it('should return 400 if the password is incorrect', async () => {
            authActions.loginUserAction.mockImplementation((req, res) => res.status(400).json({token: null}));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'john.doe@email.com', 
                    password: 'password'
                });

            expect(response.status).toBe(400);
            expect(response.body.token).toBe(null);
        });

        it('should login a user', async () => {
            authActions.loginUserAction.mockImplementation((req, res) => res.status(200).json({ info: 'user logged in successfully', token: 'fake-jwt-token' }));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'john.doe@mail.com',
                    password: 'password'
                });

            expect(response.status).toBe(200);
            expect(response.body.token).not.toBe(null);
            expect(response.body.user_id).not.toBe(null);
        });

        it('should return 400 if the user dont exist', async () => {
            authActions.loginUserAction.mockImplementation((req, res) => res.status(400).json({ error: 'invalid request' }));
            teacherQueries.checkExistsTeacher.mockImplementation(() => null);
            studentQueries.checkExistsStudent.mockImplementation(() => null);
            adminQueries.checkExistsAdmin.mockImplementation(() => null);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'john.doe@mail.com',
                    password: 'password'
                });

            expect(response.status).toBe(400);
        });

        it('should return 400 if the token generation has failed', async () => {
            authActions.loginUserAction.mockImplementation((req, res) => res.status(400).json({ error: 'invalid request' }));
            jwt.sign.mockImplementation(() => null);

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'john.doe@email.com', 
                    password: 'password'
                });
            
            expect(response.status).toBe(400);
            expect(response.body.token).toBe(null);
        });
    });

    describe('GET /auth/verifyToken', () => {
        it('should verify token', async () => {
            securityMiddleware.verifyToken.mockImplementation((req, res, next) => {
                req.user_id = 1;
                req.user_type = 'Teacher';
                next();
            });
            authActions.verifyTokenAction.mockImplementation((req, res) => res.status(200).json({ info: 'Valid token', user_id: req.user_id, user_type: req.user_type }));

            const response = await request(app)
                .get('/auth/verifyToken')
                .set('Authorization', 'Bearer fake-jwt-token');

            expect(response.status).toBe(200);
            expect(response.body.info).toBe('Valid token');
            expect(response.body.user_id).toBe(1);
            expect(response.body.user_type).toBe('Teacher');
        });

        it('should return 401 if token is invalid', async () => {
            securityMiddleware.verifyToken.mockImplementation((req, res) => res.status(401).json({ error: 'Token is invalid' }));

            const response = await request(app)
                .get('/auth/verifyToken')
                .set('Authorization', 'Bearer invalid-token');

            expect(response.status).toBe(401);
            expect(response.body.error).toBe('Token is invalid');
        });
    });
});