import { UserUi, IUserUi } from '../../UI/UserUi';

import styles from '../../styles/ChatItem.module.css';

type onClickChat = {
  id: number;
  // eslint-disable-next-line no-unused-vars
  onClickChatItem: (id: number) => void;
};

type ChatItemType = IUserUi & onClickChat & { isActive: boolean };

export const ChatItem = ({ onClickChatItem, isActive, id, ...props }: ChatItemType) => {
  const onClickIt = () => {
    onClickChatItem(id);
  };

  return (
    <div onClick={onClickIt} className={isActive ? styles.active : ''}>
      <UserUi {...props} />
    </div>
  );
};
