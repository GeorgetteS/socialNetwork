import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { upload } from '../middlewares/fileMiddleware.js';

const userRouter = Router();

userRouter.get('/:id', UserController.getUser);
userRouter.get('/');

// userRouter.put('/about', UserController.patchAbout);
userRouter.patch('/patch', upload.single('avatar'), UserController.patchUser);

export default userRouter;
