import { Chat, UserChat, User, Message } from '../models/models.js';
import ApiError from '../exceptions/apiError.js';

class ChatService {
  async createChat(isPrivate, name, participants) {
    const chat = await Chat.create({ isPrivate, name });

    const usersChats = participants.map((participant) => {
      return {
        role: participant.role,
        UserId: participant.id,
        ChatId: chat.id,
      };
    });

    const chatUsers = await UserChat.bulkCreate(usersChats);

    return { chat, chatUsers };
  }

  async checkUserChat({ ChatId, UserId }) {
    const userChat = await Chat.findOne({
      where: { id: ChatId },
      include: { model: User, where: { id: UserId } },
    });

    if (!userChat) {
      throw new ApiError(401, 'User not found');
    }
  }

  async getChats(UserId) {
    const chats = await Chat.findAll({
      include: {
        attributes: [],
        model: User,
        where: { id: UserId },
      },
    });

    return chats;
  }

  async addUser(chatUser) {
    const addedUser = await UserChat.create(chatUser);

    return addedUser;
  }

  async getUsers(ChatId) {
    const chatUsers = await Chat.findOne({ where: { id: ChatId }, include: [{ model: User }] });

    return chatUsers;
  }

  async postMessage(message) {
    // console.log(message, 'skdjfn');
    const newMessage = await Message.create(message).then((message) =>
      Message.findOne({ where: { id: message.id }, include: [{ model: User }] }),
    );

    return newMessage;
  }

  async getMessages(ChatId) {
    const newMessage = await Message.findAll({ where: { ChatId }, include: [{ model: User }] });

    return newMessage;
  }
}

export default new ChatService();
