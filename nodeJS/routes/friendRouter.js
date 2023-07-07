import express from 'express';
import friendController from '../controllers/friendController.js';

const friendRouter = express.Router();

friendRouter.get('/:UserId', friendController.getFriends);
friendRouter.post('/', friendController.inviteUser);
friendRouter.patch('/', friendController.respondToFriendRequest);

export default friendRouter;
