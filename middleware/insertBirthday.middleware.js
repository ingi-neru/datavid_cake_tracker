import db from '../db/handleBirthdays.db.js';

export default async function insertBirthday(req, res, next) {
  try {
    await db.insertBirthday(req.body);
  } catch (err) {
    console.log(err);
    req.error = err.message;
  }
  next();
}
