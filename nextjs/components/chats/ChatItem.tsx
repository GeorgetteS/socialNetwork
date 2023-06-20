import { AvatarUi, IAvatarUi } from '../../UI/AvatarUi';

import styles from '../../styles/ChatItem.module.css';

type onClickChat = {
  id: number;
  onClickChatItem: (id: number) => void;
};

type ChatItemType = IAvatarUi & onClickChat & { isActive: boolean };

export const ChatItem = ({ onClickChatItem, isActive, id, ...props }: ChatItemType) => {
  const onClickIt = () => {
    onClickChatItem(id);
  };

  return (
    <div onClick={onClickIt} className={isActive && styles.active}>
      <AvatarUi {...props} />
    </div>
  );
};
