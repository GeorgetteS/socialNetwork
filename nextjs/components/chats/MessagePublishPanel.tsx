import { Button, Input } from 'antd';
import { FC, useState } from 'react';
import Image from 'next/dist/client/image';
import { useSelector } from 'react-redux';

import { socket } from '../../socket';

import { userIdSelector } from '../../redux/user/userSelectors';

export const MessagePublishPanel: FC = ({ ChatId }: { ChatId: number }) => {
  const [messageValue, setMessageValue] = useState('');

  const UserId = useSelector(userIdSelector);

  const sendMessage = () => {
    if (!messageValue) return;
    socket.emit('message', {
      content: messageValue,
      ChatId,
      UserId,
    });

    setMessageValue('');
  };

  return (
    <>
      <Input
        onChange={(e) => setMessageValue(e.currentTarget.value)}
        placeholder="Напишите что-нибудь!"
        value={messageValue}
        onPressEnter={sendMessage}
      />
      {messageValue && (
        <Button
          onClick={sendMessage}
          icon={<Image width={22} height={22} alt="send" src={'/send.svg'} />}
          disabled={!messageValue}
        />
      )}
    </>
  );
};
