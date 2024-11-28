const { prisma } = require("../../../../database/db.connection");
const teacherQueries = require("../../../../database/queries/teacher.queries");

const teacher1 = {
  teacher_number: -1,
  user: {
    userID: -1,
    firstname: "Teacher",
    lastname: "Test1",
    email: "teacher.test1@mail.com",
    hashed_password: "password1",
  },
};

const teacher2 = {
  teacher_number: -2,
  user: {
    userID: -2,
    firstname: "Teacher",
    lastname: "Test2",
    email: "teacher.test2@mail.com",
    hashed_password: "password2",
  },
};

beforeEach(async () => {
  await prisma.teachers.create({
    data: {
      teacher_number: teacher1.teacher_number,
      user: { create: teacher1.user },
    },
  });
  await prisma.users.create({ data: teacher2.user });
});

afterEach(async () => {
  await prisma.users
    .delete({ where: { email: teacher1.user.email } })
    .catch(() => {});
  await prisma.users
    .delete({ where: { email: teacher2.user.email } })
    .catch(() => {});
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Check exists teacher", () => {
  it("should return true if teacher exists", async () => {
    const response = await teacherQueries.checkExistsTeacher(
      teacher1.user.userID
    );
    expect(response).toBe(true);
  });

  it("should return false if teacher does not exist", async () => {
    const response = await teacherQueries.checkExistsTeacher(0);
    expect(response).toBe(false);
  });
});

describe("Check exists teacher number", () => {
  it("should return true if teacher number exists", async () => {
    const response = await teacherQueries.checkExistsTeacherNumber(
      teacher1.teacher_number
    );
    expect(response).toBe(true);
  });

  it("should return false if teacher number does not exist", async () => {
    const response = await teacherQueries.checkExistsTeacherNumber(0);
    expect(response).toBe(false);
  });
});

describe("Get user by teacher number", () => {
  it("should return user if teacher number exists", async () => {
    const response = await teacherQueries.getUserByTeacherNumber(
      teacher1.teacher_number
    );
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

  it("should return null if teacher number does not exist", async () => {
    const response = await teacherQueries.getUserByTeacherNumber(0);
    expect(response).toBeNull();
  });
});

describe("Get user by teacher ID", () => {
  it("should return user if teacher ID exists", async () => {
    const response = await teacherQueries.getUserByTeacherID(
      teacher1.user.userID
    );
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
      teacher2.user.userID,
      teacher2.teacher_number
    );
    expect(response).toEqual(teacher2.user.userID);
  });

  it("should return null if teacher does exist", async () => {
    const response = await teacherQueries.createTeacher(
      teacher1.user.userID,
      teacher1.teacher_number
    );
    expect(response).toBeNull();
  });
});

describe("Update teacher", () => {
  it("should update teacher and return teacherID if teacher exists", async () => {
    const response = await teacherQueries.updateTeacher(
      teacher1.user.userID,
      teacher2.teacher_number
    );
    expect(response).toEqual(teacher1.user.userID);
  });

  it("should return null if teacher does not exist", async () => {
    const response = await teacherQueries.updateTeacher(
      0,
      teacher2.teacher_number
    );
    expect(response).toBeNull();
  });
});

describe("Delete teacher", () => {
  it("should delete teacher and return teacherID if teacher exists", async () => {
    const response = await teacherQueries.deleteTeacher(teacher1.user.userID);
    expect(response).toEqual(teacher1.user.userID);
  });

  it("should return null if teacher does not exist", async () => {
    const response = await teacherQueries.deleteTeacher(0);
    expect(response).toBeNull();
  });
});
