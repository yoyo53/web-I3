const { prisma } = require("../../../../database/db.connection");
const adminQueries = require("../../../../database/queries/admin.queries");

const user = {
    userID: -1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@mail.com",
    hashed_password: "password",
};

beforeEach(async () => {
    await prisma.admins.create({ data: { user: { create: user } } });
});

afterEach(async () => {
    await prisma.users.delete({ where: user });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("Check exists admin", () => {
    it("should return true if user exists", async () => {
        const response = await adminQueries.checkExistsAdmin(user.userID);
        expect(response).toBe(true);
    });

    it("should return false if user does not exist", async () => {
        const response = await adminQueries.checkExistsAdmin(0);
        expect(response).toBe(false);
    });
});
