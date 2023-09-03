import { useRef, useState } from 'react';

import { Messages } from './Messages';
import { MessagePublishPanel } from './MessagePublishPanel';
import styles from '../../styles/Chats.module.css';
import { ChatsList } from './ChatsList';
import ChatsView from './ChatsView';

export type TChat = {
  ChatId: number;
  name: string;
};

const Chats = () => {
  const [currentChat, setCurrentChat] = useState<TChat>({} as TChat);

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
      ChatsList={
        <ChatsList currentChat={currentChat} setCurrentChat={(ChatId) => setCurrentChat(ChatId)} />
      }
    />
  );

  // return (
  //   <div className={styles.main}>
  //     <div className={styles.container}>
  //       <div className={styles.chats_panel}>
  //         <div className={styles.chats_wrapper}>
  //           <ChatsList
  //             currentChat={currentChat}
  //             setCurrentChat={(ChatId) => setCurrentChat(ChatId)}
  //           />
  //         </div>
  //       </div>
  //       <div className={styles.chat}>
  //         {currentChat.ChatId && <button className={styles.chat_info}>{currentChat.name}</button>}

  //         {currentChat.ChatId && (
  //           <>
  //             <div className={styles.chat_messages}>
  //               <div className={styles.chat_messages_container} ref={messagesContainerRef}>
  //                 <Messages
  //                   key={currentChat.ChatId}
  //                   triggerScroll={scrollToTheEnd}
  //                   currentChat={currentChat.ChatId}
  //                 />
  //               </div>
  //             </div>
  //             <div className={styles.chat_input}>
  //               <MessagePublishPanel ChatId={currentChat.ChatId} />
  //             </div>
  //           </>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Chats;
