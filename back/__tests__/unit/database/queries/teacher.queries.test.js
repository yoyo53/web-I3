const { prismaMock } = require("../db.connection.mock");
const teacherQueries = require("../../../../database/queries/teacher.queries");

describe("Check exists teacher", () => {
  it("should return true if teacher exists", async () => {
    prismaMock.teachers.count.mockResolvedValue(1);
    const response = await teacherQueries.checkExistsTeacher(1);
    expect(response).toBe(true);
  });

  it("should return false if teacher does not exist", async () => {
    prismaMock.teachers.count.mockResolvedValue(0);
    const response = await teacherQueries.checkExistsTeacher(1);
    expect(response).toBe(false);
  });

  it("should return false if an error occurs", async () => {
    prismaMock.teachers.count.mockRejectedValue(new Error());
    const response = await teacherQueries.checkExistsTeacher(1);
    expect(response).toBe(false);
  });
});

describe("Check exists teacher number", () => {
  it("should return true if teacher number exists", async () => {
    prismaMock.teachers.count.mockResolvedValue(1);
    const response = await teacherQueries.checkExistsTeacherNumber(1);
    expect(response).toBe(true);
  });

  it("should return false if teacher number does not exist", async () => {
    prismaMock.teachers.count.mockResolvedValue(0);
    const response = await teacherQueries.checkExistsTeacherNumber(1);
    expect(response).toBe(false);
  });

  it("should return false if an error occurs", async () => {
    prismaMock.teachers.count.mockRejectedValue(new Error());
    const response = await teacherQueries.checkExistsTeacherNumber(1);
    expect(response).toBe(false);
  });
});

describe("Get user by teacher number", () => {
  it("should return user if teacher number exists", async () => {
    const teacher = {
      teacherID: 1,
      teacher_number: 1,
      user: {
        userID: 1,
        firstname: "John",
        lastname: "Doe",
        email: "test@mail.com",
      },
    };

    prismaMock.teachers.findUnique.mockResolvedValue(teacher);
    const response = await teacherQueries.getUserByTeacherNumber(1);
    expect(response).toEqual(teacher);
  });

  it("should return null if teacher number does not exist", async () => {
    prismaMock.teachers.findUnique.mockResolvedValue(null);
    const response = await teacherQueries.getUserByTeacherNumber(1);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.teachers.findUnique.mockRejectedValue(new Error());
    const response = await teacherQueries.getUserByTeacherNumber(1);
    expect(response).toBeNull();
  });
});

describe("Get user by teacher ID", () => {
  it("should return user if teacher ID exists", async () => {
    const teacher = {
      teacherID: 1,
      teacher_number: 1,
      user: {
        userID: 1,
        firstname: "John",
        lastname: "Doe",
        email: "test@mail.com",
      },
    };

    prismaMock.teachers.findUnique.mockResolvedValue(teacher);
    const response = await teacherQueries.getUserByTeacherID(1);
    expect(response).toEqual(teacher);
  });

  it("should return null if teacher ID does not exist", async () => {
    prismaMock.teachers.findUnique.mockResolvedValue(null);
    const response = await teacherQueries.getUserByTeacherID(1);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.teachers.findUnique.mockRejectedValue(new Error());
    const response = await teacherQueries.getUserByTeacherID(1);
    expect(response).toBeNull();
  });
});

describe("Create teacher", () => {
  it("should create teacher and return teacherID if teacher does not exist", async () => {
    const teacher = {
      teacherID: 1,
    };

    prismaMock.teachers.create.mockResolvedValue(teacher);
    const response = await teacherQueries.createTeacher(1, 1);
    expect(response).toEqual(teacher.teacherID);
  });

  it("should return null if teacher does exist", async () => {
    prismaMock.teachers.create.mockResolvedValue(null);
    const response = await teacherQueries.createTeacher(1, 1);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.teachers.create.mockRejectedValue(new Error());
    const response = await teacherQueries.createTeacher(1, 1);
    expect(response).toBeNull();
  });
});

describe("Update teacher", () => {
  it("should update teacher and return teacherID if teacher exists", async () => {
    const teacher = {
      teacherID: 1,
    };

    prismaMock.teachers.update.mockResolvedValue(teacher);
    const response = await teacherQueries.updateTeacher(1, 1);
    expect(response).toEqual(teacher.teacherID);
  });

  it("should return null if teacher does not exist", async () => {
    prismaMock.teachers.update.mockResolvedValue(null);
    const response = await teacherQueries.updateTeacher(1, 1);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.teachers.update.mockRejectedValue(new Error());
    const response = await teacherQueries.updateTeacher(1, 1);
    expect(response).toBeNull();
  });
});

describe("Delete teacher", () => {
  it("should delete teacher and return teacherID if teacher exists", async () => {
    const teacher = {
      teacherID: 1,
    };

    prismaMock.teachers.delete.mockResolvedValue(teacher);
    const response = await teacherQueries.deleteTeacher(1);
    expect(response).toEqual(teacher.teacherID);
  });

  it("should return null if teacher does not exist", async () => {
    prismaMock.teachers.delete.mockResolvedValue(null);
    const response = await teacherQueries.deleteTeacher(1);
    expect(response).toBeNull();
  });

  it("should return null if an error occurs", async () => {
    prismaMock.teachers.delete.mockRejectedValue(new Error());
    const response = await teacherQueries.deleteTeacher(1);
    expect(response).toBeNull();
  });
});

describe("Get teacher by user ID", () => {
  it("should return teacher if teacher exists", async () => {
    const survey = {

      surveyID: 1,
      moduleID: 1,
      groupeID: 1,
      module:{
        teacherID: 1,
        subject:{
          name: "Mathematics"
        },
        group:{
          name: "A"
        }
      }
  };

  prismaMock.surveys.findMany.mockResolvedValue([survey]);
  const response = await teacherQueries.getSurveysByTeacherID(1);
  expect(response).toEqual([{
    surveyid: survey.surveyID,
    subject: survey.module.subject.name,
    group: survey.module.group.name
  }]);
  });

  it("should return empty array if teacher does not exist", async () => {
    prismaMock.surveys.findMany.mockResolvedValue([]);
    const response = await teacherQueries.getSurveysByTeacherID(1);
    expect(response).toEqual([]);
  });

  it("should return empty array if an error occurs", async () => {  
    prismaMock.surveys.findMany.mockRejectedValue(new Error());
    const response = await teacherQueries.getSurveysByTeacherID(1);
    expect(response).toBeNull();
  });
});
