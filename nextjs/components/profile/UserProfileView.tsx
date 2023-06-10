import { FC } from 'react';
import { Space } from 'antd';

import styles from '../../styles/UserProfile.module.css';

export const UserProfileView: FC = ({ userInfo, postPublishPanel, posts }) => {
  return (
    <Space direction="vertical" size="middle" style={{ display: 'flex', maxWidth: 550 }}>
      {userInfo}
      {postPublishPanel}
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {posts}
      </Space>
    </Space>
  );
};
