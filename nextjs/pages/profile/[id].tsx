import dynamic from 'next/dynamic';

import { AppLayout } from '../../components/layout/AppLayout';

const DynamicUserProfile = dynamic(() => import('../../components/profile/UserProfile'));

const Profile = () => {
  return (
    <AppLayout>
      <DynamicUserProfile />
    </AppLayout>
  );
};

export default Profile;
