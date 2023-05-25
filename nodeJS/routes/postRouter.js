import PostController from '../controllers/postController.js';
import express from 'express';
import { upload } from '../middlewares/fileMiddleware.js';

const postRouter = express.Router();

postRouter.post('/', upload.fields([{ name: 'postImages' }]), PostController.create);
postRouter.put('/', PostController.update);
postRouter.delete('/:id', PostController.delete);

postRouter.post('/comments', PostController.createComment);
postRouter.put('/comments', PostController.updateComment);
postRouter.delete('/comments/:id', PostController.deleteComment);

postRouter.post('/like', PostController.like);
postRouter.delete('/like/:id', PostController.unLike);

export default postRouter;
