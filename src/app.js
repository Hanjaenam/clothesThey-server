import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
// import mongoose from 'mongoose';
import session from 'express-session';
import userRouter from './routers/userRouter';
import postRouter from './routers/postRouter';
import routes from './routes';
import './passport';

dotenv.config();

const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.test = 'test';
  return next();
});

app.use(routes.user, userRouter);
app.use(routes.post, postRouter);
// app.use(routes.pComment, pCommentRouter);
// app.use(routes.cComment, cCommentRouter);

export default app;
