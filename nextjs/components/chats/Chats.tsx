import { useRef, useState } from 'react';

import { Messages } from './Messages';
import { MessagePublishPanel } from './MessagePublishPanel';
import styles from '../../styles/Chats.module.css';
import { ChatsList } from './ChatsList';
import ChatsView from './ChatsView';
import { NewChat } from './NewChat';

export type TChat = {
  ChatId: number;
  name: string;
};

const CreateChatButton = ({ text, onClickMe, className }) => {
  return (
    <button className={className} onClick={() => onClickMe()}>
      {text}
    </button>
  );
};

const Chats = () => {
  const [currentChat, setCurrentChat] = useState<TChat>({} as TChat);
  const [createChatMode, setCreateChatMode] = useState(false);

  const messagesContainerRef = useRef(null);

  const scrollToTheEnd = () => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
  };

  return (
    <ChatsView
      messagesContainerRef={messagesContainerRef}
      MessagePublishPanel={<MessagePublishPanel ChatId={currentChat.ChatId} />}
      ChatName={
        currentChat.ChatId && <button className={styles.chat_info}>{currentChat.name}</button>
      }
      Messages={
        currentChat.ChatId && (
          <Messages
            key={currentChat.ChatId}
            triggerScroll={scrollToTheEnd}
            currentChat={currentChat.ChatId}
          />
        )
      }
      LeftPanel={
        createChatMode ? (
          <NewChat escapeCreateMode={() => setCreateChatMode(false)} />
        ) : (
          <ChatsList
            currentChat={currentChat}
            setCurrentChat={(ChatId) => setCurrentChat(ChatId)}
          />
        )
      }
      Button={
        <CreateChatButton
          className={styles.chats_new}
          onClickMe={() => setCreateChatMode((prev) => !prev)}
          text={createChatMode ? 'Отмена' : 'Создать чат'}
        />
      }
    />
  );
};

export default Chats;
