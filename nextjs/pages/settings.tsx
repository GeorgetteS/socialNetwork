import dynamic from 'next/dynamic';

import { AppLayout } from '../components/layout/AppLayout';

const DynamicSettings = dynamic(() => import('../components/settings/Settings'));

const SettingsPage = () => {
  return (
    <AppLayout>
      <DynamicSettings />
    </AppLayout>
  );
};

export default SettingsPage;
