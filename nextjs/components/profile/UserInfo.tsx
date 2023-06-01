import { Button, Card } from 'antd';
import { FC } from 'react';

import { AvatarUi } from '../../UI/AvatarUi';

import { userDTO } from '../../api/userApi/userConstructor';

interface IUserInfo {
  userData: userDTO;
  isMine: boolean;
}

export const UserInfo: FC<IUserInfo> = ({ userData, isMine }) => {
  const edit = isMine ? <Button>Редактировать профиль</Button> : null;

  return (
    <Card
      bodyStyle={{ display: 'none' }}
      extra={edit}
      title={
        <AvatarUi
          size={48}
          fullname={userData.fullname}
          avatar={userData.avatar}
          text={userData.about}
        />
      }
    />
  );
};
