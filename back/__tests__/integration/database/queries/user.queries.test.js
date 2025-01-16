const { prisma } = require("../../../../database/db.connection");
const userQueries = require("../../../../database/queries/user.queries");

const user = {
    userID: -1,
    firstname: "john",
    lastname: "doe",
    email: "john.doe@mail.com",
    hashed_password: "password",
};

beforeEach(async () => {
    await prisma.users.create({ data: user });
});

afterEach(async () => {
    await prisma.users.delete({ where: user });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("Check exists user", () => {
    it("should return true if user exists", async () => {
        const response = await userQueries.checkExistsUser(user.email);
        expect(response).toBe(true);
    });

    it("should return false if user does not exist", async () => {
        const response = await userQueries.checkExistsUser("");
        expect(response).toBe(false);
    });
});

describe("Get user by email with password", () => {
    it("should return user with password if user exists", async () => {
        const response = await userQueries.getUserByEmailwithPassword(user.email);
        expect(response).toEqual({
            userID: user.userID,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            hashed_password: user.hashed_password,
        });
    });

    it("should return null if user does not exist", async () => {
        const response = await userQueries.getUserByEmailwithPassword("");
        expect(response).toBeNull();
    });
});

describe("Get user by id", () => {
    it("should return user if user exists", async () => {
        const response = await userQueries.getUserById(user.userID);
        expect(response).toEqual({
            userID: user.userID,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        });
    });

    it("should return null if user does not exist", async () => {
        const response = await userQueries.getUserById(0);
        expect(response).toBeNull();
    });
});
