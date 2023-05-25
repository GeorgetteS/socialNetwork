import { body } from 'express-validator';

import express from 'express';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 20 }),
  AuthController.registration,
);

userRouter.post('/login', AuthController.login);

userRouter.post('/logout', AuthController.logout);

userRouter.get('/activate/:link', AuthController.activate);

userRouter.get('/refresh', AuthController.refresh);

export default userRouter;
