import { useState, useMemo, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Button, Select } from 'antd';

import { UserWithFlagUi } from '../../UI/UserWithFlagUi';

import { useGetUserList } from '../../hook/useGetUserList';

import { usePostChatMutation } from '../../restApi/chatApi/chatApi';
import { useGetQuerySkip } from '../../hook/useGetQuerySkip';

export interface IChat {
  id?: string;
  name: string;
  participants: IParticipant[];
}

interface IParticipant {
  id: string;
  role: 'participant' | 'admin';
}

export interface IUserBriefInfo {
  id: string;
  name: string;
}

const PER_PAGE = 10;

export const NewChat = ({ escapeCreateMode }) => {
  const [selectedUsers, setSetectedUsers] = useState<IUserBriefInfo[]>([]);
  const [chatName, setChatName] = useState<string>('');

  const { options, handleScrollOnEnd, handleSearch } = useGetUserList(PER_PAGE);

  const [lastOptionRef, inView] = useInView({
    threshold: 0,
  });

  const { UserId } = useGetQuerySkip();

  const [postChat] = usePostChatMutation();

  const isReadyToCreate = selectedUsers.length >= 1 && chatName;

  useEffect(() => {
    if (inView) {
      handleScrollOnEnd();
    }
  }, [inView, handleScrollOnEnd]);

  const createChat = () => {
    const paricipants: IParticipant[] = selectedUsers.map((user) => {
      return {
        id: user.id,
        role: 'participant',
      };
    });

    paricipants.push({ id: UserId, role: 'admin' });
    const chat: IChat = {
      name: chatName,
      participants: paricipants,
    };

    postChat(chat);
    escapeCreateMode();
  };

  const selectUser = useCallback(
    (user) => {
      const isSelected = selectedUsers.find((obj) => obj.id === user.id);

      if (isSelected) {
        deselectUser(user.name);
        return;
      }

      setSetectedUsers((prev) => [...prev, user]);
    },
    [selectedUsers],
  );

  const deselectUser = (username) => {
    setSetectedUsers((prev) => prev.filter((user) => user.name !== username));
  };

  const usersList = useMemo(() => {
    return options.map((user, _, arr) => {
      if (user.id === UserId) return;

      return (
        <UserWithFlagUi
          key={user.id}
          id={user.id}
          title={user.fullname}
          avatar={user.avatar}
          cursorPointer
          pickUser={(user) => selectUser(user)}
          isActive={!!selectedUsers.find((obj) => obj.name === user.fullname)}
          refContainer={user === arr.at(-1) ? lastOptionRef : undefined}
        />
      );
    });
  }, [selectedUsers, options, lastOptionRef, selectUser, UserId]);

  return (
    <>
      <input
        type="text"
        value={chatName}
        onChange={(e) => {
          setChatName(e.target.value);
        }}
        placeholder="Введите название чата"
      />

      <Select
        mode="tags"
        style={{
          width: '100%',
          padding: '5px',
          paddingLeft: '0px',
          fontSize: '16px',
        }}
        placeholder="Введите имя или фамилию"
        bordered={false}
        open={false}
        suffixIcon={null}
        value={selectedUsers.map((user) => user.name)}
        onDeselect={(username) => deselectUser(username)}
        onSearch={handleSearch}
      />
      <Button style={{ width: '100%' }} disabled={!isReadyToCreate} onClick={createChat}>
        Создать чат
      </Button>
      {usersList}
    </>
  );
};
