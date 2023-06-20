import { FC } from 'react';
import { Avatar } from 'antd';

import styles from '../styles/AvatarUi.module.css';

export interface IAvatarUi {
  avatar?: string;
  size?: number;
  title: string;
  text?: string;
  cursorPointer?: boolean;
}

export const AvatarUi: FC<IAvatarUi> = ({ avatar = '', size, title, text, cursorPointer }) => {
  return (
    <div className={styles.row}>
      <Avatar
        style={{ cursor: cursorPointer ? 'pointer' : 'auto' }}
        shape="circle"
        size={size || 32}
        className={styles.avatar}
        src={avatar || '/noAvatar.svg'}
      />
      <div className={styles.column}>
        <div className={styles.title}>{title}</div>
        {text && <span className={styles.text}>{text}</span>}
      </div>
    </div>
  );
};
