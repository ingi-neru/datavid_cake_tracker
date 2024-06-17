import db from '../db/handleBirthdays.db.js';
import transformDate from '../services/transformDate.js';

export default async function getEmployees(req, res, next) {
  if (req.error) {
    next();
    return;
  }
  try {
    let employees = [];
    if (!req.body.first_name && !req.body.last_name && !req.body.country && !req.body.city && !req.body.birthday) {
      employees = await db.getEmployees();
    } else {
      employees = await db.getEmployees(req.body);
    }
    transformDate(employees);
    req.employees = employees;
  } catch (err) {
    console.log(err);
    req.error = err.message;
  }
  next();
}
