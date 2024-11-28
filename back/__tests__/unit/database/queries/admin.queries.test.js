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
