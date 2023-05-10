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
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);