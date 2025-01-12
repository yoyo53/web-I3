const { prismaMock } = require("../db.connection.mock");
const adminQueries = require("../../../../database/queries/admin.queries");

describe("Check exists admin", () => {
  it("should return true if user exists", async () => {
    prismaMock.admins.count.mockResolvedValue(1);
    const response = await adminQueries.checkExistsAdmin(1);
    expect(response).toBe(true);
  });

  it("should return false if user does not exist", async () => {
    prismaMock.admins.count.mockResolvedValue(0);
    const response = await adminQueries.checkExistsAdmin(1);
    expect(response).toBe(false);
  });

  it("should return false if an error occurs", async () => {
    prismaMock.admins.count.mockRejectedValue(new Error());
    const response = await adminQueries.checkExistsAdmin(1);
    expect(response).toBe(false);
  });
});

describe("Check All surveys", () => {
  it("should return all surveys", async () => {
    const surveys = [
      {
        surveyid: 1,
        teachers: {
          users: {
            lastname: "Doe",
            firstname: "John"
          }
        },
        modules: {
          subjects:{
            name: "Mathematics"
          },
          groups:{
            name: "SE1"
          }
        }
      },
      {
        surveyid: 2,
        teachers: {
          users: {
            lastname: "Smith",
            firstname: "John"
          }
        },
        modules: {
          subjects:{
            name: "Physics"
          },
          groups:{
            name: "SE2"
          }
        }
      }
    ]
    prismaMock.surveys.findMany.mockResolvedValue(surveys);
    const response = await adminQueries.getAllSurveys();
    expect(response).toEqual(surveys.map(survey => ({
      surveyid: survey.surveyid,
      lastname: survey.teachers.users.lastname,
      firstname: survey.teachers.users.firstname,
      subject: survey.modules.subjects.name,
      group: survey.modules.groups.name
    })))

  });

  it("should return empty list if no surveys", async () => {
    prismaMock.surveys.findMany.mockResolvedValue([])
    const response = await adminQueries.getAllSurveys();
    expect(response).toEqual([])
  });

   it("should return null if an error occurs", async () => {
      prismaMock.surveys.findMany.mockRejectedValue(new Error());
      const response = await adminQueries.getAllSurveys();
      expect(response).toBeNull();
    });
})
