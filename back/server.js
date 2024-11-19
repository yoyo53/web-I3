const express = require('express');
const adminRouter = require('./routes/admin.js');

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

app.use('/admin', adminRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});