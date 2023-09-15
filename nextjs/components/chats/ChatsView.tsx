import { ReactNode, Ref } from 'react';

import styles from '../../styles/Chats.module.css';

interface IChatsView {
  LeftPanel: ReactNode;
  ChatName?: ReactNode;
  Button: ReactNode;
  MessagePublishPanel?: ReactNode;
  Messages: ReactNode;
  messagesContainerRef: Ref<HTMLDivElement>;
}

export const ChatsView = ({
  LeftPanel,
  ChatName,
  MessagePublishPanel,
  Messages,
  messagesContainerRef,
  Button,
}: IChatsView) => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.chats_panel}>
          <div className={styles.chats_wrapper}>
            {Button}
            {LeftPanel}
          </div>
        </div>
        <div className={styles.chat}>
          {ChatName}
          {Messages && (
            <>
              <div className={styles.chat_messages}>
                <div className={styles.chat_messages_container} ref={messagesContainerRef}>
                  {Messages}
                </div>
              </div>
              <div className={styles.chat_input}>{MessagePublishPanel}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsView;
