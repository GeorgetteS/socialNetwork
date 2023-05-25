import { body } from 'express-validator';

import express from 'express';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 20 }),
  AuthController.registration,
);

authRouter.post('/login', AuthController.login);

authRouter.post('/logout', AuthController.logout);

authRouter.get('/activate/:link', AuthController.activate);

authRouter.get('/refresh', AuthController.refresh);

export default authRouter;
