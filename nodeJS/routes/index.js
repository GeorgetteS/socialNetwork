import { Router } from 'express';
import authRouter from './authRouter.js';
import friendRouter from './friendRouter.js';
import chatRouter from './chatRouter.js';
import postRouter from './postRouter.js';

const router = new Router();

router.use('/', authRouter);
router.use('/friedns', friendRouter);
router.use('/chats', chatRouter);
router.use('/posts', postRouter);

export default router;
