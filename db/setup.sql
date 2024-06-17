-- 1st batch of SQL commands to create the database and tables
CREATE DATABASE IF NOT EXISTS EmployeeDB;

USE EmployeeDB;

CREATE USER IF NOT EXISTS 'user'@'localhost';

SET PASSWORD FOR 'user'@'localhost' = 'userpasswd';

GRANT ALL PRIVILEGES ON EmployeeDB.* TO 'user'@'localhost';

-- 2nd batch of SQL commands to create the tables and insert data
INSERT INTO Employees (first_name, last_name, country, city) VALUES
('John', 'Doe', 'USA', 'New York'),
('Jane', 'Smith', 'Canada', 'Toronto'),
('Carlos', 'Mendez', 'Mexico', 'Mexico City'),
('Anna', 'Ivanova', 'Russia', 'Moscow'),
('Yuki', 'Tanaka', 'Japan', 'Tokyo');

INSERT INTO Birthdays (employee_id, birthday) VALUES
(1, '1980-05-15'),
(2, '1990-08-22'),
(3, '1985-11-30'),
(4, '1978-01-20'),
(5, '1992-03-25');

INSERT INTO Admins (username, password) VALUES
('admin', '$2b$10$pEKlHkRHImqlCfsqBKmNWeiJKOM8C1DHOb8LQZ8a32809pYG8unSq'); 

-- the hashed password is 'admin'