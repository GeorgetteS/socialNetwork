import { Ref } from 'react';

import AvatarUi from './AvatarUi';
import { FlagOutlinedUi } from './FlagOutlinedUi';

import { IUserUi } from './UserUi';
import { userDTO } from '../restApi/userApi/userConstructor';

import styles from '../styles/UserUi.module.css';
import { IUserBriefInfo } from '../components/chats/NewChat';

type TUserWithFlagUi = IUserUi &
  // eslint-disable-next-line no-unused-vars
  Pick<userDTO, 'id'> & { pickUser: (obj: IUserBriefInfo) => void } & {
    isActive: boolean;
  } & { refContainer?: Ref<HTMLDivElement> };

export const UserWithFlagUi = ({
  avatar = '',
  size,
  title,
  text,
  cursorPointer,
  pickUser,
  id,
  isActive = false,
  refContainer,
}: TUserWithFlagUi) => {
  const onClickMe = () => {
    pickUser({ id, name: title } as IUserBriefInfo);
  };

  return (
    <div className={styles.row} ref={refContainer} onClick={onClickMe}>
      <AvatarUi
        style={{ cursor: cursorPointer ? 'pointer' : 'auto' }}
        size={size || 40}
        className={styles.avatar}
        src={avatar || '/noAvatar.svg'}
      />
      <div className={styles.when_flag}>
        <div className={styles.column}>
          <div className={styles.title}>{title}</div>
          {text && <span className={styles.text}>{text}</span>}
        </div>
        <FlagOutlinedUi isActive={isActive} />
      </div>
    </div>
  );
};
