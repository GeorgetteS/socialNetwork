import { Router } from 'express';
import authRouter from './authRouter.js';
import friendRouter from './friendRouter.js';
import chatRouter from './chatRouter.js';
import postRouter from './postRouter.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import userRouter from './userRouter.js';

const router = new Router();

router.use('/', authRouter);
router.use('/friedns', authMiddleware, friendRouter);
router.use('/chats', authMiddleware, chatRouter);
router.use('/posts', authMiddleware, postRouter);
router.use('/users', userRouter);

export default router;
