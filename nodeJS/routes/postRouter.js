import PostController from '../controllers/PostController.js';
import express from 'express';
import { upload } from '../middlewares/fileMiddleware.js';

const postRouter = express.Router();

postRouter.post('/', upload.fields([{ name: 'postImages' }]), PostController.create);
postRouter.get('/', PostController.getAll);
postRouter.get('/:id', PostController.getOne);
postRouter.put('/', PostController.update);
postRouter.delete('/:id', PostController.delete);

export default postRouter;
