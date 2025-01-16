const request = require("supertest");
const { app } = require("../../../app");
const { prisma } = require("../../../database/db.connection");
const { hash } = require("bcrypt");

async function hashPassword(password) {
    return await hash(password, 10);
}

const user = {
    firstname: "john",
    lastname: "doe",
    email: "john.doe@mail.com",
    password: "password",
};

beforeEach(async () => {
    const hashed_password = await hashPassword(user.password);
    await prisma.admins.create({
        data: {
            user: {
                create: {
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    hashed_password: hashed_password,
                },
            },
        },
    });
});

afterEach(async () => {
    await prisma.users.delete({ where: { email: user.email } });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("POST /auth/login", () => {
    it("should return a token", async () => {
        await request(app)
            .post("/auth/login")
            .send({
                email: user.email,
                password: user.password,
            })
            .expect(200)
            .expect("Content-Type", /json/)
            .expect((res) => {
                expect(res.body).toHaveProperty("token");
                expect(res.body.token).toEqual(expect.any(String));
                expect(res.body).toHaveProperty("user_id");
                expect(res.body.user_id).toEqual(expect.any(Number));
                expect(res.body).toHaveProperty("user_type", "Admin");
            });
    });
});
