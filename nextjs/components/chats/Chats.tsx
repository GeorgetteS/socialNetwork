import { FC } from 'react';
import { Button, Input } from 'antd';

import styles from '../../styles/Chats.module.css';
import { AvatarUi } from '../../UI/AvatarUi';

export const Chats: FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.chats_panel}>
          <div className={styles.chats_wrapper}>
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />
            <AvatarUi title="dsdds" size={48} text="dsd" />{' '}
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.chat_info}>sdkasdfj</div>
          <div className={styles.chat_messages}>
            <div className={styles.chat_messages_container}>
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              {/* <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" /> */}
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
              <AvatarUi title="dsdds" size={48} text="dsd" />
            </div>
          </div>
          <div className={styles.chat_input}>
            <Input />
            <Button />
          </div>
        </div>
      </div>
    </div>
  );
};
