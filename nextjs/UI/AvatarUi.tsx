import { FC } from 'react';
import { Avatar } from 'antd';

import styles from '../styles/AvatarUi.module.css';

interface IAvatarUi {
  avatar: string;
  size?: number;
  fullname: string;
  text: string;
}

export const AvatarUi: FC<IAvatarUi> = ({ avatar, size, fullname, text }) => {
  return (
    <div className={styles.row}>
      <Avatar shape="circle" size={size || 32} src={avatar || 'noAvatar.svg'} />
      <div className={styles.column}>
        <div className="">{fullname}</div>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};
