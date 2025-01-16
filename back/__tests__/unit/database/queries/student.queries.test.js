const { prismaMock } = require("../db.connection.mock");
const studentQueries = require("../../../../database/queries/student.queries");

describe("Check exists student", () => {
    it("should return true if student exists", async () => {
        prismaMock.students.findFirst.mockResolvedValue({ studentID: 1 });
        const response = await studentQueries.checkExistsStudent(1);
        expect(response).toBe(true);
    });

    it("should return false if student does not exist", async () => {
        prismaMock.students.findFirst.mockResolvedValue(null);
        const response = await studentQueries.checkExistsStudent(1);
        expect(response).toBe(false);
    });

    it("should return false if an error occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Error());
        const response = await studentQueries.checkExistsStudent(1);
        expect(response).toBe(false);
    });
});

describe("Check exists student number", () => {
    it("should return true if student number exists", async () => {
        prismaMock.students.findFirst.mockResolvedValue({ studentID: 1 });
        const response = await studentQueries.checkExistsStudentNumber(1);
        expect(response).toBe(true);
    });

    it("should return false if student number does not exist", async () => {
        prismaMock.students.findFirst.mockResolvedValue(null);
        const response = await studentQueries.checkExistsStudentNumber(1);
        expect(response).toBe(false);
    });

    it("should return false if an error occurs", async () => {
        prismaMock.students.findFirst.mockRejectedValue(new Error());
        const response = await studentQueries.checkExistsStudentNumber(1);
        expect(response).toBe(false);
    });
});

describe("Get user by student ID", () => {
    it("should return user if student ID exists", async () => {
        const student = {
            studentID: 1,
            student_number: 1,
            user: { userID: 1, firstname: "John", lastname: "Doe", email: "john.doe@mail.com" },
        };

        prismaMock.students.findUnique.mockResolvedValue(student);
        const response = await studentQueries.getUserByStudentID(1);
        expect(response).toEqual(student);
    });

    it("should return null if student ID does not exist", async () => {
        prismaMock.students.findUnique.mockResolvedValue(null);
        const response = await studentQueries.getUserByStudentID(1);
        expect(response).toBeNull();
    });

    it("should return null if an error occurs", async () => {
        prismaMock.students.findUnique.mockRejectedValue(new Error());
        const response = await studentQueries.getUserByStudentID(1);
        expect(response).toBeNull();
    });
});

describe("Create student", () => {
    it("should create student and return studentID if student does not exist", async () => {
        const student = { studentID: 1 };

        prismaMock.students.create.mockResolvedValue(student);
        const response = await studentQueries.createStudent(1, 1);
        expect(response).toEqual(student.studentID);
    });

    it("should return null if student does exist", async () => {
        prismaMock.students.create.mockResolvedValue(null);
        const response = await studentQueries.createStudent(1, 1);
        expect(response).toBeNull();
    });

    it("should return null if an error occurs", async () => {
        prismaMock.students.create.mockRejectedValue(new Error());
        const response = await studentQueries.createStudent(1, 1);
        expect(response).toBeNull();
    });
});
