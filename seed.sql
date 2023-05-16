
-- Seed departments data
INSERT INTO departments (name) VALUES
('Sales'),
('Human Resources'),
('Information Technology');

-- Seed roles data
INSERT INTO roles (title, department_id, salary) VALUES
('Sales Manager', 1, 120000),
('Sales Executive', 1, 85000),
('HR Manager', 2, 100000),
('HR Assistant', 2, 60000),
('IT Manager', 3, 110000),
('IT Support', 3, 80000);

-- Seed employees data
INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id)
VALUES
-- Sales Department
('John', 'Doe', 1, 1, 7),
('Jane', 'Doe', 2, 1, 7),
('Bob', 'Johnson', 2, 1, 8),
('Alice', 'Lee', 2, 1, 8),
('Mike', 'Brown', 2, 1, 8),
('Sarah', 'Kim', 2, 1, 8),
('Tom', 'Davis', 2, 1, 8),
('Anna', 'Lee', 2, 1, 8),
('Chris', 'Green', 2, 1, 8),
('Lisa', 'Chen', 2, 1, 8),
('David', 'Lee', 2, 1, 12),
('Karen', 'Smith', 2, 1, 12),
('Steven', 'Johnson', 2, 1, 12),
('Emily', 'Kim', 2, 1, 12),
('Michael', 'Lee', 2, 1, 12),
('Alex', 'Brown', 2, 1, 12),
('Grace', 'Lee', 2, 1, 12),
('Brian', 'Kim', 2, 1, 12),
('Jessica', 'Davis', 2, 1, 12),
('Daniel', 'Lee', 2, 1, 12),
-- HR Department
('Michelle', 'Smith', 4, 2, 26),
('Andrew', 'Johnson', 4, 2, 26),
('Olivia', 'Kim', 4, 2, 23),
('Eric', 'Lee', 4, 2, 23),
('Emily', 'Brown', 4, 2, 23),
('David', 'Kim', 4, 2, 23),
('Alex', 'Lee', 4, 2, 23),
('Maggie', 'Kim', 4, 2, 23),
('Tom', 'Lee', 4, 2, 23),
('Sophia', 'Kim', 4, 2, 23),
('Leo', 'Lee', 4, 2, 23),
('Tina', 'Kim', 4, 2, 32),
('Sean', 'Lee', 4, 2, 32),
('Cathy', 'Kim', 4, 2, 32),
('Steve', 'Lee', 4, 2, 32),
('Grace', 'Kim', 4, 2, 32),
('Paul', 'Lee', 4, 2, 32),
('Jenny', 'Kim', 4, 2, 32),
('Ryan', 'Lee', 4, 2, 32),
('Lucy', 'Kim', 4, 2, 32),
-- IT Department
('Daniel', 'Smith', 5, 3, 45),
('Frank', 'Johnson', 5, 3, 45),
('Erica', 'Kim', 5, 3, 41),
('Jason', 'Lee', 5, 3, 41),
('Sam', 'Kim', 6, 3, 41),
('Lucas', 'Lee', 6, 3, 41),
('Rachel', 'Kim', 6, 3, 41),
('Patrick', 'Lee', 6, 3, 41),
('Lily', 'Kim', 6, 3, 41),
('Tony', 'Lee', 6, 3, 41),
('Katie', 'Kim', 6, 3, 47),
('David', 'Lee', 6, 3, 47),
('Sophia', 'Kim', 6, 3, 47),
('Jonathan', 'Lee', 6, 3, 47),
('Amanda', 'Kim', 6, 3, 47),
('Daniel', 'Lee', 6, 3, 47),
('Samantha', 'Kim', 6, 3, 47),
('William', 'Lee', 6, 3, 47),
('Jenny', 'Kim', 6, 3, 47),
('Kevin', 'Lee', 6, 3, 47);
