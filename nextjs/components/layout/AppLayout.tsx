import React from 'react';
import { Layout } from 'antd';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

const { Content } = Layout;

export const AppLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout className="my_container" style={{ columnGap: '20px' }}>
        <Sidebar />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};
