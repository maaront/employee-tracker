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
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee':
            updateEmployee();
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

// Functions to add data to tables
// Add a department
function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the name of the new department?',
          name: 'newDepartment',
        },
      ])
      .then((answers) => {
        const newDepartment = answers.newDepartment;
        const query = 'INSERT INTO departments (name) VALUES (?)';
        const values = [newDepartment];
  
        db.query(query, values, (err, results) => {
          if (err) {
            console.error('Error adding a department:', err);
            return;
          }
          console.log('Department added:');
          console.table(results); // I want this to just display the name of the new department
  
          // View all departments after adding the department
          const selectQuery = 'SELECT * FROM departments';
          db.query(selectQuery, (selectErr, selectResults) => {
            if (selectErr) {
              console.error('Error retrieving departments:', selectErr);
              return;
            }
            console.log('Departments:');
            console.table(selectResults);
  
            inquirer
              .prompt([
                {
                  type: 'confirm',
                  message: 'Do you want to go to the Main Menu?',
                  name: 'startOver',
                  default: true,
                },
              ])
              .then((promptAnswers) => {
                if (promptAnswers.startOver) {
                  startPrompt(); // Restart the prompt
                } else {
                  // Exit the program or perform other actions
                  console.log('Exiting...');
                  db.end(); // Close the database connection
                }
              });
          });
        });
      });
  }
  
// Add a role
function addRole() {
    // Fetch all departments from the database
    const selectQuery = 'SELECT id, name FROM departments';
    db.query(selectQuery, (selectErr, selectResults) => {
      if (selectErr) {
        console.error('Error retrieving departments:', selectErr);
        return;
      }
  
      // Map the department names to an array for the inquirer prompt choices
      const departmentChoices = selectResults.map((department) => ({
        name: department.name,
        value: department.id,
      }));
  
      inquirer
        .prompt([
          {
            type: 'input',
            message: 'What is the name of the new role?',
            name: 'newRole',
          },
          {
            type: 'input',
            message: 'What is the salary of the new role?',
            name: 'newSalary',
          },
          {
            type: 'list',
            message: 'Choose the department for the new role:',
            name: 'departmentId',
            choices: departmentChoices,
          },
        ])
        .then((answers) => {
          const newRole = answers.newRole;
          const newSalary = answers.newSalary;
          const departmentId = answers.departmentId;
          const query =
            'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
          const values = [newRole, newSalary, departmentId];
  
          db.query(query, values, (err) => {
            if (err) {
              console.error('Error adding a role:', err);
              return;
            }
            console.log('Role added: ${newRole}');
  
            // View all roles after adding the role
            const selectQuery = 'SELECT * FROM roles';
            db.query(selectQuery, (selectErr, selectResults) => {
              if (selectErr) {
                console.error('Error retrieving roles:', selectErr);
                return;
              }
              console.log('Roles:');
              console.table(selectResults);
  
              inquirer
                .prompt([
                  {
                    type: 'confirm',
                    message: 'Do you want to go to the Main Menu?',
                    name: 'startOver',
                    default: true,
                  },
                ])
                .then((promptAnswers) => {
                  if (promptAnswers.startOver) {
                    startPrompt(); // Restart the prompt
                  } else {
                    // Exit the program or perform other actions
                    console.log('Exiting...');
                    db.end(); // Close the database connection
                  }
                });
            });
          });
        });
    });
  }
   
  
  // Export the startPrompt function
module.exports = {
    startPrompt
  };
