import { ReactNode } from 'react';
import { Space } from 'antd';

interface IUserProfileView {
  userInfo: ReactNode;
  postPublishPanel?: ReactNode;
  posts: ReactNode;
}

export const UserProfileView = ({ userInfo, postPublishPanel, posts }: IUserProfileView) => {
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
