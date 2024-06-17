import express from 'express';
import bodyParser from 'body-parser';
import loginAdmin from '../middleware/loginAdmin.middleware.js';

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

export default authRouter;
