const { prisma } = require("../../../../database/db.connection");
const studentQueries = require("../../../../database/queries/student.queries");
const { DatabaseError } = require("../../../../database/db.errors");

const student1 = {
    student_number: -1,
    user: {
        userID: -1,
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@mail.com",
        hashed_password: "password1",
    },
};

const student2 = {
    student_number: -2,
    user: {
        firstname: "Jane",
        lastname: "Doe",
        email: "jane.doe@mail.com",
        hashed_password: "password2",
    },
};

beforeEach(async () => {
    await prisma.students.create({
        data: { student_number: student1.student_number, user: { create: student1.user } },
    });
});

afterEach(async () => {
    await prisma.users.delete({ where: student1.user });
    await prisma.users.delete({ where: student2.user }).catch(() => {});
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("Check exists student", () => {
    it("should return true if student exists", async () => {
        const response = await studentQueries.checkExistsStudent(student1.user.userID);
        expect(response).toBe(true);
    });

    it("should return false if student does not exist", async () => {
        const response = await studentQueries.checkExistsStudent(0);
        expect(response).toBe(false);
    });
});

describe("Check exists student number", () => {
    it("should return true if student number exists", async () => {
        const response = await studentQueries.checkExistsStudentNumber(student1.student_number);
        expect(response).toBe(true);
    });

    it("should return false if student number does not exist", async () => {
        const response = await studentQueries.checkExistsStudentNumber(0);
        expect(response).toBe(false);
    });
});

describe("Get user by student ID", () => {
    it("should return user if student ID exists", async () => {
        const response = await studentQueries.getUserByStudentID(student1.user.userID);
        expect(response).toEqual({
            studentID: student1.user.userID,
            student_number: student1.student_number,
            user: {
                userID: student1.user.userID,
                firstname: student1.user.firstname,
                lastname: student1.user.lastname,
                email: student1.user.email,
            },
        });
    });

    it("should return null if student ID does not exist", async () => {
        const response = await studentQueries.getUserByStudentID(0);
        expect(response).toBeNull();
    });
});

describe("Create student", () => {
    it("should create student and return studentID if student does not exist", async () => {
        const response = await studentQueries.createStudent(
            student2.student_number,
            student2.user.firstname,
            student2.user.lastname,
            student2.user.email,
            student2.user.hashed_password,
        );
        expect(response).not.toBeNull();
    });

    it("should throw DatabaseError if student does exist", async () => {
        await expect(
            studentQueries.createStudent(
                student1.student_number,
                student1.user.firstname,
                student1.user.lastname,
                student1.user.email,
                student1.user.hashed_password,
            ),
        ).rejects.toThrow(DatabaseError);
    });
});
