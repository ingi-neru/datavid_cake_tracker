import mysql from 'mysql2/promise.js';

export class HandleBirthdaysDB {
  constructor() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      password: 'userpasswd',
      host: 'localhost',
      database: 'EmployeeDB',
      user: 'user',
      port: 3306,
    });
  }

  async createBirthdays() {
    await this.pool.query(`
    CREATE TABLE IF NOT EXISTS Birthdays (
      birthday_id INT PRIMARY KEY NOT NULL auto_increment,
      employee_id INT NOT NULL,
      birthday DATE NOT NULL,
      FOREIGN KEY (employee_id) REFERENCES Employees(employee_id))
    `);
  }

  async createEmployees() {
    await this.pool.query(`
    CREATE TABLE IF NOT EXISTS Employees (
      employee_id INT PRIMARY KEY NOT NULL auto_increment,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      city VARCHAR(100) NOT NULL)
    `);
  }

  async createAdmins() {
    await this.pool.query(`
    CREATE TABLE IF NOT EXISTS Admins (
      admin_id INT PRIMARY KEY NOT NULL auto_increment,
      username VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL)
    `);
  }

  async insertEmployee(employee) {
    const { first_name, last_name, country, city } = employee;
    await this.pool.query(`
    INSERT INTO Employees (first_name, last_name, country, city)
    VALUES ('${first_name}', '${last_name}', '${country}', '${city}')
    `);
  }

  async getEmployees(employee) {
    if (!employee) {
      const [employees] = await this.pool.query(`
      SELECT e.first_name, e.last_name, e.country, e.city, b.birthday
      FROM Employees e
      JOIN Birthdays b ON e.employee_id = b.employee_id
      `);
      if (!employees.length) {
        return [];
      }
      return employees;
    }
    const { first_name, last_name, country, city, birthday } = employee;
    let query = `SELECT e.first_name, e.last_name, e.country, e.city, b.birthday
      FROM Employees e
      JOIN Birthdays b ON e.employee_id = b.employee_id`;
    const conditions = [];
    if (first_name) {
      query += ` WHERE e.first_name = ?`;
      conditions.push(first_name);
    }
    if (last_name) {
      query += conditions.length ? ` AND e.last_name = ?` : ` WHERE e.last_name = ?`;
      conditions.push(last_name);
    }
    if (country) {
      query += conditions.length ? ` AND e.country = ?` : ` WHERE e.country = ?`;
      conditions.push(country);
    }
    if (city) {
      query += conditions.length ? ` AND e.city = ?` : ` WHERE e.city = ?`;
      conditions.push(city);
    }
    if (birthday) {
      query += conditions.length ? ` AND b.birthday = ?` : ` WHERE b.birthday = ?`;
      conditions.push(birthday);
    }
    console.log(query, conditions);
    const [employees] = await this.pool.query(query, conditions);
    if (!employees.length) {
      return [];
    }
    return employees;
  }

  async sortByClosestBirthday() {
    const [employees] = await this.pool.query(`
      SELECT * FROM Employees
      JOIN Birthdays
      ON Employees.employee_id = Birthdays.employee_id
      ORDER BY 
        CASE 
          WHEN DATE_FORMAT(Birthdays.birthday, '%m-%d') >= DATE_FORMAT(CURDATE(), '%m-%d') 
          THEN DATE_FORMAT(Birthdays.birthday, '%m-%d')
          ELSE DATE_FORMAT(CONCAT(YEAR(CURDATE()) + 1, '-', DATE_FORMAT(Birthdays.birthday, '%m-%d')), '%Y-%m-%d')
        END
    `);
    if (!employees.length) {
      return [];
    }
    return employees;
  }

  async getAdmin(username, password) {
    const [admin] = await this.pool.query(
      `
    SELECT * FROM Admins
    WHERE username = ? AND password = ?
    `,
      [username, password],
    );
    if (!admin.length) {
      return [];
    }
    return admin;
  }

  async insertAdmin(admin) {
    const { username, password } = admin;
    await this.pool.query(`
    INSERT INTO Admins (username, password)
    VALUES ('${username}', '${password}')
    `);
  }

  async insertBirthday(birthday) {
    const { employee_id, birthday_date } = birthday;
    await this.pool.query(`
    INSERT INTO Birthdays (employee_id, birthday)
    VALUES ('${employee_id}', '${birthday_date}')
    `);
  }

  async getEmployeeId(employee) {
    const { first_name, last_name, country, city } = employee;
    const [employeeId] = await this.pool.query(
      `
    SELECT employee_id FROM Employees
    WHERE first_name = ? AND last_name = ? AND country = ? AND city = ?
    LIMIT 1;
    `,
      [first_name, last_name, country, city],
    );
    if (!employeeId.length) {
      return '';
    }
    return employeeId[0].employee_id;
  }
  async getPassword(username) {
    const [admin] = await this.pool.query(
      `
    SELECT password FROM Admins
    WHERE username = ?
    `,
      [username],
    );
    if (!admin.length) {
      return '';
    }
    return admin[0].password;
  }
}

const db = new HandleBirthdaysDB();

try {
  db.createEmployees();
  db.createBirthdays();
  db.createAdmins();
} catch (err) {
  console.error(err);
  process.exit(1);
}

export default db;
