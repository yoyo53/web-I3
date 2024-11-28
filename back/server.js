const { prisma } = require("./database/db.connection");
const { app } = require("./app");

prisma
  .$connect()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  })
  .catch((e) => {
    console.error("Database connection failed:", e);
  });