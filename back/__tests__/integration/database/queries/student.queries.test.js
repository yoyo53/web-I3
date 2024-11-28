const { prisma } = require("../../../../database/db.connection");
const studentQueries = require("../../../../database/queries/student.queries");

const student1 = {
  student_number: -1,
  user: {
    userID: -1,
    firstname: "Student",
    lastname: "Test1",
    email: "student.test1@mail.com",
    hashed_password: "password1",
  },
};

const student2 = {
  student_number: -2,
  user: {
    userID: -2,
    firstname: "Student",
    lastname: "Test2",
    email: "student.test2@mail.com",
    hashed_password: "password2",
  },
};

beforeEach(async () => {
  await prisma.students.create({
    data: {
      student_number: student1.student_number,
      user: { create: student1.user },
    },
  });
  await prisma.users.create({ data: student2.user });
});

afterEach(async () => {
  await prisma.users
    .delete({ where: { email: student1.user.email } })
    .catch(() => {});
  await prisma.users
    .delete({ where: { email: student2.user.email } })
    .catch(() => {});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Check exists student", () => {
  it("should return true if student exists", async () => {
    const response = await studentQueries.checkExistsStudent(
      student1.user.userID
    );
    expect(response).toBe(true);
  });

  it("should return false if student does not exist", async () => {
    const response = await studentQueries.checkExistsStudent(0);
    expect(response).toBe(false);
  });
});

describe("Check exists student number", () => {
  it("should return true if student number exists", async () => {
    const response = await studentQueries.checkExistsStudentNumber(
      student1.student_number
    );
    expect(response).toBe(true);
  });

  it("should return false if student number does not exist", async () => {
    const response = await studentQueries.checkExistsStudentNumber(0);
    expect(response).toBe(false);
  });
});

describe("Get user by student number", () => {
  it("should return user if student number exists", async () => {
    const response = await studentQueries.getUserByStudentNumber(
      student1.student_number
    );
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

  it("should return null if student number does not exist", async () => {
    const response = await studentQueries.getUserByStudentNumber(0);
    expect(response).toBeNull();
  });
});

describe("Get user by student ID", () => {
  it("should return user if student ID exists", async () => {
    const response = await studentQueries.getUserByStudentID(
      student1.user.userID
    );
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
      student2.user.userID,
      student2.student_number
    );
    expect(response).toEqual(student2.user.userID);
  });

  it("should return null if student does exist", async () => {
    const response = await studentQueries.createStudent(
      student1.user.userID,
      student1.student_number
    );
    expect(response).toBeNull();
  });
});

describe("Update student", () => {
  it("should update student and return studentID if student exists", async () => {
    const response = await studentQueries.updateStudent(
      student1.user.userID,
      student2.student_number
    );
    expect(response).toEqual(student1.user.userID);
  });

  it("should return null if student does not exist", async () => {
    const response = await studentQueries.updateStudent(
      0,
      student2.student_number
    );
    expect(response).toBeNull();
  });
});

describe("Delete student", () => {
  it("should delete student and return studentID if student exists", async () => {
    const response = await studentQueries.deleteStudent(student1.user.userID);
    expect(response).toEqual(student1.user.userID);
  });

  it("should return null if student does not exist", async () => {
    const response = await studentQueries.deleteStudent(0);
    expect(response).toBeNull();
  });
});
