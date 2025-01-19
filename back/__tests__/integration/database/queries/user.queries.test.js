const { prisma } = require("../../../../database/db.connection");
const userQueries = require("../../../../database/queries/user.queries");

const user = {
    userID: -1,
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@mail.com",
    hashed_password: "password",
};

beforeAll(async () => {
    await prisma.users.create({ data: user });
});

afterAll(async () => {
    await prisma.users.delete({ where: { userID: user.userID } });
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

describe("Get user password by id", () => {
    it("should return user password if user exists", async () => {
        const response = await userQueries.getUserPasswordById(user.userID);
        expect(response).toBe(user.hashed_password);
    });

    it("should return null if user does not exist", async () => {
        const response = await userQueries.getUserPasswordById(0);
        expect(response).toBeNull();
    });
});

describe("Get user type by id", () => {
    it("should return Admin if user is an admin", async () => {
        await prisma.admins.create({ data: { user: { connect: { userID: user.userID } } } });
        const response = await userQueries.getUserTypeById(user.userID);
        expect(response).toBe("Admin");
        await prisma.admins.delete({ where: { adminID: user.userID } });
    });

    it("should return Teacher if user is a teacher", async () => {
        await prisma.teachers.create({ data: { teacher_number: -1, user: { connect: { userID: user.userID } } } });
        const response = await userQueries.getUserTypeById(user.userID);
        expect(response).toBe("Teacher");
        await prisma.teachers.delete({ where: { teacherID: user.userID } });
    });

    it("should return Student if user is a student", async () => {
        await prisma.students.create({ data: { student_number: -1, user: { connect: { userID: user.userID } } } });
        const response = await userQueries.getUserTypeById(user.userID);
        expect(response).toBe("Student");
        await prisma.students.delete({ where: { studentID: user.userID } });
    });

    it("should return null if user is in multiple roles", async () => {
        await prisma.admins.create({ data: { user: { connect: { userID: user.userID } } } });
        await prisma.teachers.create({ data: { teacher_number: -1, user: { connect: { userID: user.userID } } } });
        const response = await userQueries.getUserTypeById(user.userID);
        expect(response).toBeNull();
        await prisma.admins.delete({ where: { adminID: user.userID } });
        await prisma.teachers.delete({ where: { teacherID: user.userID } });
    });

    it("should return null if user is not an admin, teacher or student", async () => {
        const response = await userQueries.getUserTypeById(user.userID);
        expect(response).toBeNull();
    });

    it("should return null if user does not exist", async () => {
        const response = await userQueries.getUserTypeById(0);
        expect(response).toBeNull();
    });
});
