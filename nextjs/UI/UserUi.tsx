import AvatarUi from './AvatarUi';

import styles from '../styles/UserUi.module.css';

export interface IUserUi {
  avatar?: string;
  size?: number;
  title: string;
  text?: string;
  cursorPointer?: boolean;
}

export const UserUi = ({ avatar = '', size, title, text, cursorPointer }: IUserUi) => {
  return (
    <div className={styles.row}>
      <AvatarUi
        style={{ cursor: cursorPointer ? 'pointer' : 'auto' }}
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
