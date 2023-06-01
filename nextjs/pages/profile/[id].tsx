import { FC } from 'react';

import { AppLayout } from '../../components/layout/AppLayout';
import { UserProfile } from '../../components/profile/UserProfile';

const Profile: FC = () => {
  return (
    <AppLayout>
      <UserProfile />
    </AppLayout>
  );
};

export default Profile;
