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
        'Add an employee',
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
          case 'Update an employee role':
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
            process.exit(); // Exit the Node.js process
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
            process.exit(); // Exit the Node.js process
          }
        });
    });
  }
  
  // Employees
  function displayEmployees() {
    // View all employees with role names, department names, and manager names
    const selectQuery = `
    SELECT 
        employees.first_name,
        employees.last_name,
        roles.title AS role_name,
        departments.name AS department_name,
        managers.first_name AS manager_first_name,
        managers.last_name AS manager_last_name
    FROM
        employees
    JOIN
        roles
    ON
        employees.role_id = roles.id
    JOIN
        departments
    ON
        employees.department_id = departments.id
    LEFT JOIN
        employees AS managers
    ON
        employees.manager_id = managers.id
  `;

  db.query(selectQuery, (selectErr, selectResults) => {
    if (selectErr) {
      console.error('Error retrieving employees:', selectErr);
      return;
    }
    console.log('Employees:');
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
        .then((answers) => {
          if (answers.startOver) {
            startPrompt(); // Restart the prompt
          } else {
            // Exit the program or perform other actions
            console.log('Exiting...');
            db.end(); // Close the database connection
            process.exit(); // Exit the Node.js process
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
                  process.exit(); // Exit the Node.js process
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
                    process.exit(); // Exit the Node.js process
                  }
                });
            });
          });
        });
    });
  }

  

  function addEmployee() {
    // Fetch all roles from the database
    const selectRolesQuery = 'SELECT id, title, salary FROM roles';
    db.query(selectRolesQuery, (selectRolesErr, selectRolesResults) => {
      if (selectRolesErr) {
        console.error('Error retrieving roles:', selectRolesErr);
        return;
      }
  
      // Map the role names to an array for the inquirer prompt choices
      const roleChoices = selectRolesResults.map((role) => ({
        name: role.title,
        value: role.id,
        salary: role.salary,
      }));
  
      // Fetch all departments from the database
      const selectDepartmentsQuery = 'SELECT id, name FROM departments';
      db.query(selectDepartmentsQuery, (selectDepartmentsErr, selectDepartmentsResults) => {
        if (selectDepartmentsErr) {
          console.error('Error retrieving departments:', selectDepartmentsErr);
          return;
        }
  
        // Map the department names to an array for the inquirer prompt choices
        const departmentChoices = selectDepartmentsResults.map((department) => ({
          name: department.name,
          value: department.id,
        }));
  
        // Fetch all employees from the database
        const selectEmployeesQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employees';
        db.query(selectEmployeesQuery, (selectEmployeesErr, selectEmployeesResults) => {
          if (selectEmployeesErr) {
            console.error('Error retrieving employees:', selectEmployeesErr);
            return;
          }
  
          // Map the employee names to an array for the inquirer prompt choices
          const employeeChoices = selectEmployeesResults.map((employee) => ({
            name: employee.full_name,
            value: employee.id,
          }));
  
          inquirer
            .prompt([
              {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'firstName',
              },
              {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'lastName',
              },
              {
                type: 'list',
                message: 'Choose the role for the new employee:',
                name: 'roleId',
                choices: roleChoices,
              },
              {
                type: 'list',
                message: 'Choose the department for the new employee:',
                name: 'departmentId',
                choices: departmentChoices,
              },
              {
                type: 'list',
                message: 'Choose the manager for the new employee:',
                name: 'manager_id',
                choices: employeeChoices,
              },
            ])
            .then((answers) => {
              const firstName = answers.firstName;
              const lastName = answers.lastName;
              const roleId = answers.roleId;
              const departmentId = answers.departmentId;
              const manager_id = answers.manager_id;
  
          

                const query = 'INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id) VALUES (?, ?, ?, ?, ?)';
                const values = [firstName, lastName, roleId, departmentId, manager_id];
                
            
                db.query(query, values, (err) => {
                  if (err) {
                    console.error('Error adding an employee:', err);
                    return;
                  }
                  console.log(`Employee added: ${firstName} ${lastName}`);
                
                // View all employees with role names, department names, and manager names
                const selectQuery = `
                  SELECT 
                      employees.first_name,
                      employees.last_name,
                      roles.title AS role_name,
                      departments.name AS department_name,
                      managers.first_name AS manager_first_name,
                      managers.last_name AS manager_last_name
                  FROM
                      employees
                  JOIN
                      roles
                  ON
                      employees.role_id = roles.id
                  JOIN
                      departments
                  ON
                      employees.department_id = departments.id
                  LEFT JOIN
                      employees AS managers
                  ON
                      employees.manager_id = managers.id
                `;

                db.query(selectQuery, (selectErr, selectResults) => {
                  if (selectErr) {
                    console.error('Error retrieving employees:', selectErr);
                    return;
                  }
                  console.log('Employees:');
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
                          process.exit(); // Exit the Node.js process
                        }
                      });
                  });
                });
              });``
            });
          });
        });
    };

    function updateEmployee() {
      // Fetch all employees from the database
      const selectEmployeesQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employees';
      db.query(selectEmployeesQuery, (selectEmployeesErr, selectEmployeesResults) => {
        if (selectEmployeesErr) {
          console.error('Error retrieving employees:', selectEmployeesErr);
          return;
        }
    
        // Map the employee names to an array for the inquirer prompt choices
        const employeeChoices = selectEmployeesResults.map((employee) => ({
          name: employee.full_name,
          value: employee.id,
        }));
    
        // Fetch all roles from the database
        const selectRolesQuery = 'SELECT id, title FROM roles';
        db.query(selectRolesQuery, (selectRolesErr, selectRolesResults) => {
          if (selectRolesErr) {
            console.error('Error retrieving roles:', selectRolesErr);
            return;
          }
    
          // Map the role names to an array for the inquirer prompt choices
          const roleChoices = selectRolesResults.map((role) => ({
            name: role.title,
            value: role.id,
          }));
    
          // Ask the user to select the employee and the new role
          inquirer
            .prompt([
              {
                type: 'list',
                message: 'Which employee do you want to update?',
                name: 'employeeId',
                choices: employeeChoices,
              },
              {
                type: 'list',
                message: 'Choose the updated role for the employee:',
                name: 'roleId',
                choices: roleChoices,
              },
            ])
            .then((answers) => {
              const employeeId = answers.employeeId;
              const roleId = answers.roleId;
    
              const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
              const values = [roleId, employeeId];
    
              db.query(query, values, (err) => {
                if (err) {
                  console.error('Error updating the employee role:', err);
                  return;
                }
                console.log('Employee role updated.');
    
                // Restart the prompt
                startPrompt();
              });
            });
        });
      });
    }
    
    
    


// Export the startPrompt function
module.exports = {
    startPrompt
};
 
