import express from 'express';
import insertEmployee from '../middleware/insertEmployee.middleware.js';
import getEmployees from '../middleware/getEmployees.middleware.js';

const adminRouter = express.Router();

adminRouter.get('/addmember', (req, res) => {
  if (!req.session.admin) {
    res.render('error', { errorMessage: 'You are not logged in as admin', admin: false });
    return;
  } else {
    const admin = req.session.admin ? true : false;
    res.render('employee-form', { user: req.session.user, admin });
  }
});

adminRouter.post('/newmember', insertEmployee, getEmployees, (req, res) => {
  if (req.error) {
    res.render('error', { error: req.error });
    return;
  } else {
    const admin = req.session.admin ? true : false;
    res.render('index', { title: 'Employees', admin, employees: req.employees });
  }
});

export default adminRouter;
