import React from 'react';
import { Layout } from 'antd';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

const { Content } = Layout;

export const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Header />
      {/* <div className="container"> */}
      <Layout>
        <Sidebar />
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100vh',
            flex: '1 1 auto',
          }}>
          {children}
        </Content>
      </Layout>
      {/* </div> */}
    </Layout>
  );
};
