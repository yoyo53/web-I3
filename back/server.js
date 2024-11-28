const { prisma } = require("./database/db.connection");
const { app } = require("./app");
const express = require('express');
const adminRouter = require('./routes/admin.js');
const cors = require('cors')

const app = express();
const { pool } = require('./database/db_connection.js');

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


pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur de connexion à la base de données', err.stack)
    } else {
        console.log('Connecté à la base de données le', res.rows[0].now)
    }
    }
)


app.use(cors({
  "origin": "*",
  "methods": "GET,POST,PUT,DELETE,OPTIONS",
  "allowedHeaders": "X-Requested-With,Content-Type,Authorization"
}))

app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});