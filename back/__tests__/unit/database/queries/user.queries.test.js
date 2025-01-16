const { prismaMock } = require("../db.connection.mock");
const userQueries = require("../../../../database/queries/user.queries");

describe("Check exists user", () => {
    it("should return true if user exists", async () => {
        prismaMock.users.findFirst.mockResolvedValue({ userID: 1 });
        const response = await userQueries.checkExistsUser("test@mail.com");
        expect(response).toBe(true);
    });

    it("should return false if user does not exist", async () => {
        prismaMock.users.findFirst.mockResolvedValue(null);
        const response = await userQueries.checkExistsUser("test@mail.com");
        expect(response).toBe(false);
    });

    it("should return false if an error occurs", async () => {
        prismaMock.users.findFirst.mockRejectedValue(new Error());
        const response = await userQueries.checkExistsUser("test@mail.com");
        expect(response).toBe(false);
    });
});

describe("Get user by email with password", () => {
    it("should return user with password if user exists", async () => {
        const user = {
            userID: 1,
            firstname: "John",
            lastname: "Doe",
            email: "john.doe@mail.com",
            hashed_password: "password",
        };
        prismaMock.users.findUnique.mockResolvedValue(user);
        const response = await userQueries.getUserByEmailwithPassword("john.doe@mail.com");
        expect(response).toEqual(user);
    });

    it("should return null if user does not exist", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);
        const response = await userQueries.getUserByEmailwithPassword("john.doe@mail.com");
        expect(response).toBeNull();
    });

    it("should return null if an error occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Error());
        const response = await userQueries.getUserByEmailwithPassword("john.doe@mail.com");
        expect(response).toBeNull();
    });
});

describe("Get user by id", () => {
    it("should return user if user exists", async () => {
        const user = { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" };
        prismaMock.users.findUnique.mockResolvedValue(user);
        const response = await userQueries.getUserById(1);
        expect(response).toEqual(user);
    });

    it("should return null if user does not exist", async () => {
        prismaMock.users.findUnique.mockResolvedValue(null);
        const response = await userQueries.getUserById(1);
        expect(response).toBeNull();
    });

    it("should return null if an error occurs", async () => {
        prismaMock.users.findUnique.mockRejectedValue(new Error());
        const response = await userQueries.getUserById(1);
        expect(response).toBeNull();
    });
});
