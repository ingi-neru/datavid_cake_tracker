import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import getEmployees from '../middleware/getEmployees.middleware.js';
import sortEmployees from '../middleware/sortEmployees.middleware.js';

const mainRouter = express.Router();
mainRouter.use(bodyParser.urlencoded({ extended: true }));
mainRouter.use(express.static(path.join(process.cwd(), 'static')));

mainRouter.get('/', getEmployees, (req, res) => {
  if (req.error) {
    res.render('error', { error: req.error });
    return;
  } else {
    const admin = req.session.admin ? true : false;
    res.render('index', { title: 'Employees', admin, employees: req.employees });
  }
});

mainRouter.post('/search', getEmployees, (req, res) => {
  if (req.error) {
    res.render('error', { error: req.error});
    return;
  } else {
    const admin = req.session.admin ? true : false;
    res.render('index', { title: 'Employees', admin, employees: req.employees });
  }
});

mainRouter.get('/sort', sortEmployees, (req, res) => {
  if (req.error) {
    res.render('error', { error: req.error });
    return;
  } else {
    const admin = req.session.admin ? true : false;
    res.render('index', { title: 'Employees', admin, employees: req.employees });
  }
});

export default mainRouter;
