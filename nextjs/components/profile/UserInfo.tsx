import { Button, Card } from 'antd';
import { FC } from 'react';
import { useRouter } from 'next/router';

import { AvatarUi } from '../../UI/AvatarUi';

import { userDTO } from '../../api/userApi/userConstructor';

type IUserInfo = userDTO & { isMine: boolean };

export const UserInfo: FC<IUserInfo> = ({ fullname, isMine, about, avatar }) => {
  const router = useRouter();

  const goToSettings = () => {
    router.push('/settings');
  };

  const edit = isMine ? <Button onClick={goToSettings}>Редактировать профиль</Button> : null;

  return (
    <Card
      bodyStyle={{ display: about ? 'block' : 'none' }}
      extra={edit}
      title={<AvatarUi size={54} title={fullname} avatar={avatar} />}>
      {about}
    </Card>
  );
};
