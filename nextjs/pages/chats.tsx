import { FC } from 'react';

import { AppLayout } from '../components/layout/AppLayout';
import { Chats } from '../components/chats/Chats';

const ChatsPage: FC = () => {
  return (
    <AppLayout>
      <Chats />
    </AppLayout>
  );
};

export default ChatsPage;
