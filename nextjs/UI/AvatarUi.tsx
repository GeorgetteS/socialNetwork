import { FC } from 'react';
import { Avatar } from 'antd';

import styles from '../styles/AvatarUi.module.css';

export const AvatarUi: FC = ({ avatarImage, size, name, text }) => {
  return (
    <div className={styles.row}>
      <Avatar shape="circle" size={size || 32} src={avatarImage || 'noAvatar.svg'} />
      <div className={styles.column}>
        <div className="">name</div>
        <div className={styles.text}>text</div>
      </div>
    </div>
  );
};
