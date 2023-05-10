
-- Seed departments data
INSERT INTO departments (name) VALUES
('Sales'),
('Human Resources'),
('Information Technology');

-- Seed roles data
INSERT INTO roles (title, department_id, salary) VALUES
('Sales Manager', 1, 120000.00),
('Sales Executive', 1, 85000.00),
('HR Manager', 2, 100000.00),
('HR Assistant', 2, 60000.00),
('IT Manager', 3, 110000.00),
('IT Support', 3, 80000.00);

-- Seed employees data
INSERT INTO employees (firstname, lastname, role_id, department_id, manager_name)
VALUES
-- Sales Department
('John', 'Doe', 1, 1, 'Michael Smith'),
('Jane', 'Doe', 2, 1, 'Michael Smith'),
('Bob', 'Johnson', 2, 1, 'David Brown'),
('Alice', 'Lee', 2, 1, 'David Brown'),
('Mike', 'Brown', 2, 1, 'David Brown'),
('Sarah', 'Kim', 2, 1, 'David Brown'),
('Tom', 'Davis', 2, 1, 'David Brown'),
('Anna', 'Lee', 2, 1, 'David Brown'),
('Chris', 'Green', 2, 1, 'David Brown'),
('Lisa', 'Chen', 2, 1, 'David Brown'),
('David', 'Lee', 2, 1, 'Karen Johnson'),
('Karen', 'Smith', 2, 1, 'Karen Johnson'),
('Steven', 'Johnson', 2, 1, 'Karen Johnson'),
('Emily', 'Kim', 2, 1, 'Karen Johnson'),
('Michael', 'Lee', 2, 1, 'Karen Johnson'),
('Alex', 'Brown', 2, 1, 'Karen Johnson'),
('Grace', 'Lee', 2, 1, 'Karen Johnson'),
('Brian', 'Kim', 2, 1, 'Karen Johnson'),
('Jessica', 'Davis', 2, 1, 'Karen Johnson'),
('Daniel', 'Lee', 2, 1, 'Karen Johnson'),
-- HR Department
('Michelle', 'Smith', 4, 2, 'Sarah Johnson'),
('Andrew', 'Johnson', 4, 2, 'Sarah Johnson'),
('Olivia', 'Kim', 4, 2, 'John Brown'),
('Eric', 'Lee', 4, 2, 'John Brown'),
('Emily', 'Brown', 4, 2, 'John Brown'),
('David', 'Kim', 4, 2, 'John Brown'),
('Alex', 'Lee', 4, 2, 'John Brown'),
('Maggie', 'Kim', 4, 2, 'John Brown'),
('Tom', 'Lee', 4, 2, 'John Brown'),
('Sophia', 'Kim', 4, 2, 'John Brown'),
('Leo', 'Lee', 4, 2, 'John Brown'),
('Tina', 'Kim', 4, 2, 'Jenny Wang'),
('Sean', 'Lee', 4, 2, 'Jenny Wang'),
('Cathy', 'Kim', 4, 2, 'Jenny Wang'),
('Steve', 'Lee', 4, 2, 'Jenny Wang'),
('Grace', 'Kim', 4, 2, 'Jenny Wang'),
('Paul', 'Lee', 4, 2, 'Jenny Wang'),
('Jenny', 'Kim', 4, 2, 'Jenny Wang'),
('Ryan', 'Lee', 4, 2, 'Jenny Wang'),
('Lucy', 'Kim', 4, 2, 'Jenny Wang'),
-- IT Department
('Daniel', 'Smith', 5, 3, 'Jessica Chen'),
('Frank', 'Johnson', 5, 3, 'Jessica Chen'),
('Erica', 'Kim', 5, 3, 'Daniel Lee'),
('Jason', 'Lee', 5, 3, 'Daniel Lee'),
('Sam', 'Kim', 6, 3, 'Daniel Lee'),
('Lucas', 'Lee', 6, 3, 'Daniel Lee'),
('Rachel', 'Kim', 6, 3, 'Daniel Lee'),
('Patrick', 'Lee', 6, 3, 'Daniel Lee'),
('Lily', 'Kim', 6, 3, 'Daniel Lee'),
('Tony', 'Lee', 6, 3, 'Daniel Lee'),
('Katie', 'Kim', 6, 3, 'Rachel Lee'),
('David', 'Lee', 6, 3, 'Rachel Lee'),
('Sophia', 'Kim', 6, 3, 'Rachel Lee'),
('Jonathan', 'Lee', 6, 3, 'Rachel Lee'),
('Amanda', 'Kim', 6, 3, 'Rachel Lee'),
('Daniel', 'Lee', 6, 3, 'Rachel Lee'),
('Samantha', 'Kim', 6, 3, 'Rachel Lee'),
('William', 'Lee', 6, 3, 'Rachel Lee'),
('Jenny', 'Kim', 6, 3, 'Rachel Lee'),
('Kevin', 'Lee', 6, 3, 'Rachel Lee');