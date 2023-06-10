import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { upload } from '../middlewares/fileMiddleware.js';

const userRouter = Router();

userRouter.get('/:id', UserController.getUser);
userRouter.get('/', UserController.searchUsers); //?name=*&limit=*&page=*
userRouter.get('/');

userRouter.patch('/', upload.single('avatar'), UserController.patchUser);

export default userRouter;
