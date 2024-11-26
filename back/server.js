const express = require('express');
const { json } = require('express');
const cors = require('cors')
const { prisma } = require('./database/db.connection');

const app = express();

app.use(cors({
  "origin": "*",
  "methods": "GET,POST,PUT,DELETE,OPTIONS",
  "allowedHeaders": "X-Requested-With,Content-Type,Authorization"
}))

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

prisma.$connect()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    })
    .catch((e) => {
        console.error('Database connection failed:', e);
    });