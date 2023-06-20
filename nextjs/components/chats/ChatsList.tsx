import { useSelector } from 'react-redux';
import { Spin } from 'antd';

import { userIdSelector } from '../../redux/user/userSelectors';
import { useGetChatsByUserIdQuery } from '../../api/chatApi/chatApi';
import { ChatItem } from './ChatItem';
import { socket } from '../../socket';

export const ChatsList = ({
  currentChat,
  setCurrentChat,
}: {
  currentChat: number;
  setCurrentChat: (ChatId: number) => void;
}) => {
  const UserId = useSelector(userIdSelector);

  const skip = {
    skip: UserId === undefined,
  };

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
