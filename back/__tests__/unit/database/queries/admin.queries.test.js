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
        surveyID: 1,
        module: {
          subject:{
            name: "Mathematics"
          },
          group:{
            name: "SE1"
          },
          teacher: {
            user: {
              lastname: "Doe",
              firstname: "John"
            }
          },  
        }
      },
      {
        surveyID: 2,
        module: {
          subject:{
            name: "Physics"
          },
          group:{
            name: "SE2"
          },
          teacher: {
            user: {
              lastname: "Smith",
              firstname: "John"
            }
          }
        }
      }
    ]
    prismaMock.surveys.findMany.mockResolvedValue(surveys);
    const response = await adminQueries.getAllSurveys();
    expect(response).toEqual(surveys.map(survey => ({
      surveyID: survey.surveyID,
      lastname: survey.module.teacher.user.lastname,
      firstname: survey.module.teacher.user.firstname,
      subject: survey.module.subject.name,
      group: survey.module.group.name
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
