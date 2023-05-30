import { FC } from 'react';

import { useSelector } from 'react-redux';

import { Space } from 'antd';

import styles from '../../styles/UserProfile.module.css';
import { PostPublishPanel } from './PostPublishPanel';
import { Post } from './Post';
import { useGetPostsByUserIdQuery } from '../../api/postApi/postApi';
import { userIdSelector } from '../../redux/user/userSelectors';

export const UserProfile: FC = () => {
  const UserId = useSelector(userIdSelector);

  const { data, isLoading } = useGetPostsByUserIdQuery(UserId, { skip: UserId === undefined });

  return (
    <div className={styles.root}>
      <div className={styles.header}></div>
      <Space direction="vertical" size="middle" style={{ display: 'flex', maxWidth: 550 }}>
        <PostPublishPanel />
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          {/* <Post text="dfbsgb" images={['logo.svg', 'logo.svg']} /> */}
          {data &&
            data.map((post) => {
              return <Post key={post.id} {...post} />;
            })}
        </Space>
      </Space>
    </div>
  );
};
