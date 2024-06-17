import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import session from 'express-session';
import authRouter from './routes/auth.route.js';
import adminRouter from './routes/admin.route.js';
import mainRouter from './routes/main.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));
app.use(
  session({
    secret: '142e6ecf42884f03',
    resave: false,
    saveUninitialized: true,
  }),
);

app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`A szerver fut a ${PORT}-es porton.`);
});
