import { Router } from 'express';
import userRouter from './userRouter.js';
import friendRouter from './friendRouter.js';
import chatRouter from './chatRouter.js';
import settingsRouter from './settingsRouter.js';
import profileRouter from './profileRouter.js';
import postRouter from './postRouter.js';

const router = new Router();

router.use('/', userRouter);
router.use('/friedns', friendRouter);
router.use('/chats', chatRouter);
router.use('/settings', settingsRouter);
router.use('/profile', profileRouter);
router.use('/posts', postRouter);

export default router;
