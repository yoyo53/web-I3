const express = require('express');
const adminRouter = require('./routes/admin.js');

const teacherRouter = require('./routes/teacher.routes.js');

const app = express();

const { pool } = require('./database/db_connection.js');
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur de connexion à la base de données', err.stack)
    } else {
        console.log('Connecté à la base de données le', res.rows[0].now)
    }
    }
)

const cors = require('cors')

app.use(cors({
  "origin": "*",
  "methods": "GET,POST,PUT,DELETE,OPTIONS",
  "allowedHeaders": "X-Requested-With,Content-Type,Authorization"
}))

app.use('/admin', adminRouter);
app.use('/teacher', teacherRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});