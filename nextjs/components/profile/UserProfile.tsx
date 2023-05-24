import { FC } from 'react';

import { Card, Space } from 'antd';

import styles from '../../styles/UserProfile.module.css';
import { PostConstructor } from './PostConstructor';

export const UserProfile: FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.header}></div>
      <PostConstructor />
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card title="Card" size="small">
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="Card" size="small">
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card title="Card" size="small">
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </div>
  );
};
