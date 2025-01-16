const { mockDeep, mockReset } = require("jest-mock-extended");

const { prisma } = require("../../../database/db.connection");
const prismaMock = prisma;

jest.mock("../../../database/db.connection", () => mockDeep());

beforeEach(() => {
    mockReset(prismaMock);
});

module.exports = { prismaMock };
