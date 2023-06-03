import { FC } from 'react';
import { useSelector } from 'react-redux';

import { AppLayout } from '../components/layout/AppLayout';
import { ProfileEditor } from '../components/settings/ProfileEditor';
import { useGetUserQuery } from '../api/userApi/userApi';
import { userIdSelector } from '../redux/user/userSelectors';
import { Skeleton } from 'antd';

const Settings: FC = () => {
  const UserId = useSelector(userIdSelector);

  const { data, isLoading } = useGetUserQuery(UserId, { skip: UserId === undefined });

  return (
    <AppLayout>
      {isLoading ? <Skeleton avatar paragraph={{ rows: 0 }} /> : <ProfileEditor {...data} />}
    </AppLayout>
  );
};

export default Settings;
