import { useRouter } from 'next/router';
import { Button, Card, Skeleton } from 'antd';

import { UserUi } from '../../UI/UserUi';

import { useGetUserQuery } from '../../restApi/userApi/userApi';
import { IUserProfileInfo } from './UserProfile';

export const UserInfo = ({ isMine, currentUser, skip }: IUserProfileInfo) => {
  const router = useRouter();

  const { data: userData, isLoading: isUserQueryLoading } = useGetUserQuery(currentUser, skip);

  const goToSettings = () => {
    router.push('/settings');
  };

  const edit = isMine ? <Button onClick={goToSettings}>Редактировать профиль</Button> : null;

  if (isUserQueryLoading) {
    return <Skeleton avatar paragraph={{ rows: 0 }} />;
  }

  return (
    <Card
      bodyStyle={{ display: userData?.about ? 'block' : 'none' }}
      extra={edit}
      title={<UserUi size={54} title={userData?.fullname} avatar={userData?.avatar} />}>
      {userData?.about}
    </Card>
  );
};
