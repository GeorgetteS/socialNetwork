import { Server } from 'socket.io';
import ChatService from '../services/chatService.js';

export function initSokets(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('error', (e) => console.error(e));

  io.on('connection', (socket) => {
    console.log('UserConnected!');

    socket.on('joinRoom', async ({ ChatId, UserId }) => {
      try {
        await ChatService.checkUserChat({ ChatId, UserId });

        const roomName = String(ChatId);

        socket.join(roomName);
      } catch (e) {
        socket.emit('error', e);
      }
    });

    socket.on('message', async (message) => {
      try {
        const roomName = String(message.ChatId);

        const newMessage = await ChatService.postMessage(message);

        console.log(newMessage);

        io.to(roomName).emit('message', newMessage);
      } catch (e) {
        socket.emit('error', e);
      }
    });
  });
}
