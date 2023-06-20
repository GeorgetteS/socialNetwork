import ChatService from '../services/chatService.js';

class ChatController {
  async createChat(req, res, next) {
    try {
      const { isPrivate, name, participants } = req.body;

      const chat = await ChatService.createChat(isPrivate, name, participants);

      return res.json(chat);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getChats(req, res, next) {
    try {
      const { UserId } = req.params;

      const chats = await ChatService.getChats(UserId);

      return res.json(chats);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async addUser(req, res, next) {
    try {
      const { UserId, ChatId, role } = req.body;

      const addedUser = await ChatService.addUser({ UserId, ChatId, role });

      return res.json(addedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { ChatId } = req.params;

      const chatUsers = await ChatService.getUsers(ChatId);

      return res.json(chatUsers);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getMessages(req, res, next) {
    try {
      const { ChatId } = req.params;

      const messages = await ChatService.getMessages(ChatId);

      return res.json(messages);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async postMessage(req, res, next) {
    try {
      const { ChatId, UserId, content } = req.body;

      console.log(ChatId, UserId, content);

      const message = await ChatService.postMessage({ ChatId, UserId, content });

      return res.json(message);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ChatController();
