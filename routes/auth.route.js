import express from 'express';
import bodyParser from 'body-parser';
import loginAdmin from '../middleware/loginAdmin.middleware.js';
import getEmployees from '../middleware/getEmployees.middleware.js';

const authRouter = express.Router();
authRouter.use(bodyParser.json());

authRouter.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

authRouter.post('/isadmin', loginAdmin, (req, res) => {
  if (req.error) {
    res.json({ error: req.error });
  } else {
    res.json({ status: req.session.admin });
  }
});

authRouter.get('/logout', getEmployees, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.render('error', { error: err.message });
    } else {
      res.render('index', { title: 'Employees', admin: false, employees: req.employees });
    }
  });
});

export default authRouter;
