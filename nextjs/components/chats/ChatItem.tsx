import { UserUi, IUserUi } from '../../UI/UserUi';

import styles from '../../styles/ChatItem.module.css';
import { TChat } from './Chats';

type onClickChat = {
  chat: TChat;
  // eslint-disable-next-line no-unused-vars
  onClickChatItem: (chat: TChat) => void;
};

type ChatItemType = IUserUi & onClickChat & { isActive: boolean };

export const ChatItem = ({ onClickChatItem, isActive, chat, ...props }: ChatItemType) => {
  const onClickIt = () => {
    console.log(chat, 'chat');

    onClickChatItem(chat);
  };

  return (
    <div onClick={onClickIt} className={isActive ? styles.active : ''}>
      <UserUi {...props} />
    </div>
  );
};
