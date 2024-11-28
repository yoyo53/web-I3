const { prisma } = require("../../../database/db.connection");

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Check database connection", () => {
  it("should connect to the database", async () => {
    await prisma.$connect();
  });
});
