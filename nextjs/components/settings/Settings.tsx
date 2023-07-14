import { Skeleton } from 'antd';

import { ProfileEditor } from './ProfileEditor';
import { useGetUserQuery } from '../../restApi/userApi/userApi';
import { useGetQuerySkip } from '../../hook/useGetQuerySkip';

const Settings = () => {
  const { UserId, skip } = useGetQuerySkip();

  const { data, isLoading } = useGetUserQuery(UserId, skip);

  return isLoading ? <Skeleton avatar paragraph={{ rows: 0 }} /> : <ProfileEditor {...data} />;
};

export default Settings;
