import express from 'express';
import routes from 'routes';
import {
  logIn,
  logOut,
  register,
  getUser,
  patchUser,
} from 'controllers/userController';
import { onlyPrivate } from 'middlewares';

const authRouter = express.Router();

authRouter.post(routes.logIn, logIn, getUser);
authRouter.get(routes.logOut, logOut);
authRouter.post(routes.register, register, logIn, getUser);
authRouter.get(routes.getUser, getUser);
authRouter.patch(routes.patch, onlyPrivate, patchUser);

export default authRouter;
