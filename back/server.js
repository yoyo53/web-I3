const { prisma } = require("./database/db.connection");
const { app } = require("./app");

const PORT = process.env.PORT || 3000;

prisma
  .$connect()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  })
  .catch((e) => {
    console.error("Database connection failed:", e);
  });
