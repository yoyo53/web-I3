const { prisma } = require("../../../../database/db.connection");
const teacherQueries = require("../../../../database/queries/teacher.queries");
const { DatabaseError } = require("../../../../database/db.errors");

const teacher1 = {
    teacher_number: -1,
    user: {
        userID: -1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@mail.com",
        hashed_password: "password1",
    },
};

const teacher2 = {
    teacher_number: -2,
    user: {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@mail.com",
        hashed_password: "password2",
    },
};

beforeAll(async () => {
    await prisma.teachers.create({
        data: { teacher_number: teacher1.teacher_number, user: { create: teacher1.user } },
    });
});

afterEach(async () => {
    await prisma.users.delete({ where: { email: teacher2.user.email } }).catch(() => {});
});

afterAll(async () => {
    await prisma.users.delete({ where: { userID: teacher1.user.userID } });
    await prisma.$disconnect();
});

describe("Check exists teacher number", () => {
    it("should return true if teacher number exists", async () => {
        const response = await teacherQueries.checkExistsTeacherNumber(teacher1.teacher_number);
        expect(response).toBe(true);
    });

    it("should return false if teacher number does not exist", async () => {
        const response = await teacherQueries.checkExistsTeacherNumber(0);
        expect(response).toBe(false);
    });
});

describe("Get user by teacher ID", () => {
    it("should return user if teacher ID exists", async () => {
        const response = await teacherQueries.getUserByTeacherID(teacher1.user.userID);
        expect(response).toEqual({
            teacherID: teacher1.user.userID,
            teacher_number: teacher1.teacher_number,
            user: {
                userID: teacher1.user.userID,
                firstname: teacher1.user.firstname,
                lastname: teacher1.user.lastname,
                email: teacher1.user.email,
            },
        });
    });

    it("should return null if teacher ID does not exist", async () => {
        const response = await teacherQueries.getUserByTeacherID(0);
        expect(response).toBeNull();
    });
});

describe("Create teacher", () => {
    it("should create teacher and return teacherID if teacher does not exist", async () => {
        const response = await teacherQueries.createTeacher(
            teacher2.teacher_number,
            teacher2.user.firstname,
            teacher2.user.lastname,
            teacher2.user.email,
            teacher2.user.hashed_password,
        );
        expect(response).not.toBeNull();
    });

    it("should throw DatabaseError if teacher does exist", async () => {
        await expect(
            teacherQueries.createTeacher(
                teacher1.teacher_number,
                teacher1.user.firstname,
                teacher1.user.lastname,
                teacher1.user.email,
                teacher1.user.hashed_password,
            ),
        ).rejects.toThrow(DatabaseError);
    });
});
