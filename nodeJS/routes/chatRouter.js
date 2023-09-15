import express from 'express';
import ChatController from '../controllers/chatController.js';

const chatRouter = express.Router();

chatRouter.get('/:UserId', ChatController.getChats);
chatRouter.post('/', ChatController.createChat);

chatRouter.get('/participants/:ChatId', ChatController.getUsers);
chatRouter.post('/participants', ChatController.addUser);

chatRouter.get('/messages/:ChatId', ChatController.getMessages);
chatRouter.post('/messages', ChatController.postMessage);

export default chatRouter;
