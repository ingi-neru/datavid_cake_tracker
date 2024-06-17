import bcrypt from 'bcrypt';
import db from '../db/handleBirthdays.db.js';

export default async function loginAdmin(req, res, next) {
  const { username, password } = req.body;
  const storedPassword = await db.getPassword(username);
  if (!storedPassword || storedPassword === '') {
    req.session.admin = false;
  }
  if (await bcrypt.compare(password, storedPassword)) {
    req.session.admin = true;
  }
  next();
}
