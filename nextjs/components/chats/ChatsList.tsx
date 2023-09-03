import { Spin } from 'antd';

import { useGetChatsByUserIdQuery } from '../../restApi/chatApi/chatApi';
import { ChatItem } from './ChatItem';
import { socket } from '../../socket';
import { useGetQuerySkip } from '../../hook/useGetQuerySkip';

import { TChat } from './Chats';

export const ChatsList = ({
  currentChat,
  setCurrentChat,
}: {
  currentChat: TChat;
  // eslint-disable-next-line no-unused-vars
  setCurrentChat: (currentChat: TChat) => void;
}) => {
  const { UserId, skip } = useGetQuerySkip();
  const { data: chatsData, isLoading } = useGetChatsByUserIdQuery(UserId, skip);

  const openChat = (selectedChat: TChat) => {
    setCurrentChat(selectedChat);
    socket.emit('joinRoom', { ChatId: selectedChat.ChatId, UserId });
  };

  if (isLoading) {
    return <Spin />;
  }

  return chatsData?.map((chat) => {
    return (
      <ChatItem
        key={chat.id}
        chat={{ ChatId: chat.id, name: chat.name }}
        onClickChatItem={(selectedChat) => openChat(selectedChat)}
        title={chat.name}
        avatar="/chats.svg"
        isActive={chat.id === currentChat}
      />
    );
  });
};
