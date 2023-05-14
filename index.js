// Import packages
const mysql = require('mysql2');
const inquirer = require('inquirer');

// Create a connection to the database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'company_db',
  });
  
  // Connect to the database
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the company_db database.');
    startPrompt();
  });



// Begin user prompts
function startPrompt() {
inquirer
  .prompt([
    {
      type: 'list',
      message: 'Welcome to the Company Database. Please select from the following:',
      name: 'mainMenu',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add a employee',
        'Update an employee role'
      ],
    },
  ])
  .then((answers) => {
        const choice = answers.mainMenu;
  // Switch case to call functions that list the tables based on user choice
        switch (choice) {
          case 'View all departments':
            displayDepartments();
            break;
          case 'View all roles':
            displayRoles();
            break;
          case 'View all employees':
            displayEmployees();
            break;
          default:
            console.log('Invalid choice.');
            break;
        }
      });
  
  
  // Functions to display tables
  //Departments
  function displayDepartments() {
    const query = 'SELECT * FROM departments';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving departments:', err);
        return;
      }
      console.log('Departments:');
      console.table(results);
  
      inquirer
        .prompt([
          {
            type: 'confirm',
            message: 'Do you want to go to the Main Menu?',
            name: 'startOver',
            default: true,
          },
        ])
        .then((answers) => {
          if (answers.startOver) {
            startPrompt(); // Restart the prompt
          } else {
            // Exit the program or perform other actions
            console.log('Exiting...');
            db.end(); // Close the database connection
          }
        });
    });
  }
  
  // Roles
  function displayRoles() {
    const query = 'SELECT * FROM roles';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving roles:', err);
        return;
      }
      console.log('Roles:');
      console.table(results);
  
      inquirer
        .prompt([
          {
            type: 'confirm',
            message: 'Do you want to go to the Main Menu?',
            name: 'startOver',
            default: true,
          },
        ])
        .then((answers) => {
          if (answers.startOver) {
            startPrompt(); // Restart the prompt
          } else {
            // Exit the program or perform other actions
            console.log('Exiting...');
            db.end(); // Close the database connection
          }
        });
    });
  }
  
  // Employees
  function displayEmployees() {
    const query = 'SELECT * FROM employees';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving employees:', err);
        return;
      }
  
      console.log('Employees:');
      console.table(results);
  
      inquirer
        .prompt([
          {
            type: 'confirm',
            message: 'Do you want to go to the Main Menu?',
            name: 'startOver',
            default: true,
          },
        ])
        .then((answers) => {
          if (answers.startOver) {
            startPrompt(); // Restart the prompt
          } else {
            // Exit the program or perform other actions
            console.log('Exiting...');
            db.end(); // Close the database connection
          }
        });
    });
  }
}
  
  // Export the startPrompt function
module.exports = {
    startPrompt
  };
