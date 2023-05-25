import PostController from '../controllers/postController.js';
import express from 'express';
import { upload } from '../middlewares/fileMiddleware.js';

const postRouter = express.Router();

postRouter.post('/', upload.fields([{ name: 'postImages' }]), PostController.create);
postRouter.put('/', PostController.update);
postRouter.delete('/:id', PostController.delete);

export default postRouter;
