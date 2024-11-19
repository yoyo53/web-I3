const express = require('express');
const { json } = require('express');

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

// Middleware for parsing application/json
app.use(json());
app.use(express.urlencoded({ extended: true }));

// Middleware for handling JSON errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error('Bad JSON format:', err.message);
      return res.status(400).send({ error: 'Bad JSON format' });
    }
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/auth', require('./routes/auth.routes'));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});