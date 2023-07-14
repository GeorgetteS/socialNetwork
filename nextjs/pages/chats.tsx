import dynamic from 'next/dynamic';

import { AppLayout } from '../components/layout/AppLayout';

const DynamicChats = dynamic(() => import('../components/chats/Chats'));

const ChatsPage = () => {
  return (
    <AppLayout>
      <DynamicChats />
    </AppLayout>
  );
};

export default ChatsPage;
