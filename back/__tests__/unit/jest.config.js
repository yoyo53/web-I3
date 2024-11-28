module.exports = {
  clearMocks: true,
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/database/db.connection.mock.js"],
  testMatch: ["**/*.test.js"],
};
