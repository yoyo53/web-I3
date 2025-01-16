const request = require('supertest');
const express = require('express');
const userRoutes = require('../../../routes/user.routes');
const userController = require('../../../controllers/user.controller');

const app = express();
app.use(express.json());
app.use('/user', userRoutes);

jest.mock('../../../controllers/user.controller');

describe('user routes', () => {
    describe('GET /user/data', () => {
        it('should return 200 and user data', async () => {
            const mockUserData = {
                id: '123',
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com'
            };
            userController.getUserData.mockImplementation((req, res) => {
                res.status(200).json(mockUserData);
            });

            const response = await request(app).get('/user/data');

            expect(response.status).toBe(200);
        });

        it('should return 500 if there is an error', async () => {
            userController.getUserData.mockImplementation((req, res) => {
                res.status(500).send('Error');
            });

            const response = await request(app).get('/user/data');

            expect(response.status).toBe(500);
        });
    });
});