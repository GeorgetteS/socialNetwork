import { useRef, useState } from 'react';

import { Messages } from './Messages';
import { MessagePublishPanel } from './MessagePublishPanel';
import styles from '../../styles/Chats.module.css';
import { ChatsList } from './ChatsList';

const Chats = () => {
  const [currentChat, setCurrentChat] = useState(null);

  const messagesContainerRef = useRef(null);

  const scrollToTheEnd = () => {
    if (!messagesContainerRef.current) return;
    messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.chats_panel}>
          <div className={styles.chats_wrapper}>
            <ChatsList
              currentChat={currentChat}
              setCurrentChat={(ChatId) => setCurrentChat(ChatId)}
            />
          </div>
        </div>
        <div className={styles.chat}>
          {currentChat && (
            <>
              <div className={styles.chat_messages}>
                <div className={styles.chat_messages_container} ref={messagesContainerRef}>
                  <Messages
                    key={currentChat}
                    triggerScroll={scrollToTheEnd}
                    currentChat={currentChat}
                  />
                </div>
              </div>
              <div className={styles.chat_input}>
                <MessagePublishPanel ChatId={currentChat} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chats;
