const request = require('supertest');
const express = require('express');
const teacherRoutes = require('../../../routes/teacher.routes');
const teacherController = require('../../../controllers/teacher.controller');

const app = express();
app.use(express.json());
app.use('/teacher', teacherRoutes);

jest.mock('../../../controllers/teacher.controller');

describe('teacher routes', () => {
    describe('GET /teacher/surveys', () => {
        it('should return 200 and a list of surveys', async () => {
            const mockSurveys = [
                { id: 1, title: 'Survey 1' },
                { id: 2, title: 'Survey 2' }
            ];
            teacherController.getTeacherSurveys.mockImplementation((req, res) => {
                res.status(200).json(mockSurveys);
            });

            const response = await request(app).get('/teacher/surveys');

            expect(response.status).toBe(200);
        });

        it('should return 500 if there is an error', async () => {
            teacherController.getTeacherSurveys.mockImplementation((req, res) => {
                res.status(500).send('Error');
            });

            const response = await request(app).get('/teacher/surveys');

            expect(response.status).toBe(500);
        });
    });

    describe('GET /teacher/surveys/:id', () => {
        it('should return 200 and a survey by ID', async () => {
            const mockSurvey = {
                id: 1,
                title: 'Survey 1',
                questions: [
                    { question_id: 1, question_text: 'Question 1' },
                    { question_id: 2, question_text: 'Question 2' }
                ]
            };
            teacherController.getSurveyByID.mockImplementation((req, res) => {
                res.status(200).json(mockSurvey);
            });

            const response = await request(app).get('/teacher/surveys/1');

            expect(response.status).toBe(200);
        });

        it('should return 500 if there is an error', async () => {
            teacherController.getSurveyByID.mockImplementation((req, res) => {
                res.status(500).send('Error');
            });

            const response = await request(app).get('/teacher/surveys/1');

            expect(response.status).toBe(500);
        });
    });
});