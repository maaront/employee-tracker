const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'wildthings',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

// Get a list of all movies
app.get('/api/movies', async (req, res) => {
    try {
      const results = await db.promise().query('SELECT * FROM movies');
      res.send(results[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error getting movies!');
    }
  });


  app.get('/', (req, res) => {
    res.send('Hello World!');
  });