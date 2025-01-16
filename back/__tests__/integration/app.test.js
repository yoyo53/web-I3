const request = require("supertest");
const { app } = require("../../app");

describe("GET /", () => {
    it('should return "API of TeachPoint with Express.js and Prisma"', async () => {
        await request(app)
            .get("/")
            .expect("Content-Type", /text/)
            .expect(200)
            .expect("API of TeachPoint with Express.js and Prisma");
    });
});
