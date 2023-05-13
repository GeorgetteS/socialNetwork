import { body } from 'express-validator';

import express from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 20 }),
  UserController.registration,
);

userRouter.post('/login', UserController.login);

userRouter.post('/logout', UserController.logout);

userRouter.get('/activate/:link', UserController.activate);

userRouter.get('/refresh', UserController.refresh);

userRouter.get('/users', authMiddleware, UserController.getUsers);

export default userRouter;
