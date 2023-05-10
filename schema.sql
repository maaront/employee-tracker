DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT NOT NULL,
  department_id INT NOT NULL,
  salary_id INT NOT NULL,
  manager VARCHAR(50) NOT NULL
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  department_id VARCHAR(50) NOT NULL,
  salary DECIMAL(10,2) NOT NULL
);


CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);


-- SELECT employees.id, first_name, last_name, roles.title, departments.name, roles.salary, manager 
-- FROM employees
-- INNER JOIN roles ON employees.role_id = roles.id
-- INNER JOIN departments ON employees.department_id = departments.id;