import db from '../db/handleBirthdays.db.js';
import transformDate from '../services/transformDate.js';

export default async function sortEmployees(req, res, next) {
  if (req.error) {
    next();
    return;
  }
  try {
    const employees = await db.sortByClosestBirthday();
    transformDate(employees);
    req.employees = employees;
  } catch (err) {
    console.log(err);
    req.error = err.message;
  }
  next();
}
