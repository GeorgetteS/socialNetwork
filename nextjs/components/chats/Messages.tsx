import { useEffect, useState } from 'react';

import { Spin } from 'antd';

import { messageConstructor, messageDTO } from '../../restApi/chatApi/messageConstructor';
import { AvatarUi } from '../../UI/AvatarUi';
import { socket } from '../../socket';
import { useLazyGetMessagesQuery } from '../../restApi/chatApi/chatApi';

export const Messages = ({
  currentChat,
  triggerScroll,
}: {
  currentChat: number;
  triggerScroll: () => void;
}) => {
  const [messages, setMessages] = useState<messageDTO[]>([]);

  const [loadMessages, messagesQuery] = useLazyGetMessagesQuery();
  const { isLoading } = messagesQuery;

  const loadInitialList = async () => {
    const data = await loadMessages(currentChat);

    return data.data;
  };

  useEffect(() => {
    const catchMessage = (message) => {
      if (message.ChatId !== currentChat) return;

      const formatted = new messageConstructor(message).getField();
      setMessages((prev) => [...prev, formatted]);
    };

    socket.on('message', catchMessage);

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    loadInitialList().then((initialMessages = []) => setMessages([...initialMessages]));

    return () => {
      setMessages([]);
    };
  }, []);

  useEffect(() => {
    triggerScroll();
  }, [messages, triggerScroll]);

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      {messages.map((message) => {
        return (
          <AvatarUi
            key={message.id}
            avatar={message.userAvatar}
            title={message.userName}
            text={message.content}
            size={40}
          />
        );
      })}
    </>
  );
};
