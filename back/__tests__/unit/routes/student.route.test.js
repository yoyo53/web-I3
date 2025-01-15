const request = require('supertest');
const express = require('express');
const studentRoutes = require('../../../routes/student.routes');
const studentController = require('../../../controllers/student.controller');
const securityMiddleware = require('../../../middlewares/security');

const app = express();
app.use(express.json());
app.use('/student', studentRoutes);

jest.mock('../../../controllers/student.controller');
jest.mock('../../../middlewares/security');

describe('student routes', () => {
    beforeEach(() => {
        securityMiddleware.verifyToken.mockImplementation((req, res, next) => {
            req.user_id = 1; // Mock user_id for testing
            next();
        });
    });

    describe('GET /student/surveys', () => {
        it('should return all surveys for a student', async () => {
            const mockSurveys = [{ surveyID: 1, subject: 'Math', group: 'A', teacher: { firstname: 'John', lastname: 'Doe' } }];
            studentController.getStudentSurveys.mockImplementation((req, res) => res.status(200).json(mockSurveys));

            const response = await request(app).get('/student/surveys');
            expect(response.status).toBe(200);
        });

        it('should return 500 if there is an error', async () => {
            studentController.getStudentSurveys.mockImplementation((req, res) => res.status(500).send('Error while fetching surveys'));

            const response = await request(app).get('/student/surveys');
            expect(response.status).toBe(500);
        });
    });

    describe('GET /student/surveys/:id', () => {
        it('should return a specific survey by ID', async () => {
            const mockSurvey = { surveyID: 1, subject: 'Math', group: 'A', teacher: { firstname: 'John', lastname: 'Doe' } };
            studentController.getSurveyByID.mockImplementation((req, res) => res.status(200).json(mockSurvey));

            const response = await request(app).get('/student/surveys/1');
            expect(response.status).toBe(200);
        });

        it('should return 500 if there is an error', async () => {
            studentController.getSurveyByID.mockImplementation((req, res) => res.status(500).send('Error while fetching survey'));

            const response = await request(app).get('/student/surveys/1');
            expect(response.status).toBe(500);
        });
    });

    describe('POST /student/answertosurvey', () => {
        it('should submit answers to a survey', async () => {
            studentController.answerToSurvey.mockImplementation((req, res) => res.status(200).json(mockResponse));

            const response = await request(app).post('/student/answertosurvey').send({ surveyID: 1, answers: [{ questionID: 1, answer_text: 'Answer' }] });
            expect(response.status).toBe(200);
        });

        it('should return 400 if required parameters are missing', async () => {
            const response = await request(app).post('/student/answertosurvey').send({ answers: [{ questionID: 1, answer_text: 'Answer' }] });
            expect(response.status).toBe(400);
        });

        it('should return 500 if there is an error', async () => {
            studentController.answerToSurvey.mockImplementation((req, res) => res.status(500).json({ error: 'Error while answering survey' }));

            const response = await request(app).post('/student/answertosurvey').send({ surveyID: 1, answers: [{ questionID: 1, answer_text: 'Answer' }] });
            expect(response.status).toBe(500);
        });
    });
});