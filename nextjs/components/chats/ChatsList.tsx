import { Spin } from 'antd';

import { useGetChatsByUserIdQuery } from '../../restApi/chatApi/chatApi';
import { ChatItem } from './ChatItem';
import { socket } from '../../socket';
import { useGetQuerySkip } from '../../hook/useGetQuerySkip';

export const ChatsList = ({
  currentChat,
  setCurrentChat,
}: {
  currentChat: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentChat: (ChatId: number) => void;
}) => {
  const { UserId, skip } = useGetQuerySkip();

  const { data: chatsData, isLoading } = useGetChatsByUserIdQuery(UserId, skip);

  const openChat = (ChatId) => {
    setCurrentChat(ChatId);
    socket.emit('joinRoom', { ChatId, UserId });
  };

  if (isLoading) {
    return <Spin />;
  }

  return chatsData?.map((chat) => {
    return (
      <ChatItem
        key={chat.id}
        id={chat.id}
        onClickChatItem={(id) => openChat(id)}
        title={chat.name}
        avatar="/chats.svg"
        isActive={chat.id === currentChat}
      />
    );
  });
};
