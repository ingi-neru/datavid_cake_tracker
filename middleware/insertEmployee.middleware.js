import db from '../db/handleBirthdays.db.js';

export default async function insertEmployee(req, res, next) {
  if (req.error) {
    next();
    return;
  }
  try {
    const { first_name, last_name, country, city, birthday } = req.body;

    if (!first_name || !last_name || !country || !city || !birthday) {
      req.error = 'Insufficient data for entry.';
    }

    const date = new Date(birthday);
    const today = new Date();

    const ageDifMs = today.getTime() - date.getTime();

    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age < 18) {
      req.error = 'User must be at least 18 years old.';
    }

    await db.insertEmployee({ first_name, last_name, country, city });
    const employee_id = await db.getEmployeeId({ first_name, last_name, country, city });
    await db.insertBirthday({ employee_id, birthday_date: birthday });
    req.body = '';
  } catch (err) {
    console.log(err);
    req.error = err.message;
  }
  next();
}
