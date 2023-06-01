import { useRouter } from 'next/router';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Skeleton, Spin } from 'antd';

import { PostPublishPanel } from './PostPublishPanel';
import { Post } from './Post';
import { useGetPostsByUserIdQuery } from '../../api/postApi/postApi';
import { userIdSelector } from '../../redux/user/userSelectors';
import { UserInfo } from './UserInfo';
import { useGetUserQuery } from '../../api/userApi/userApi';
import { UserProfileLayout } from './UserProfileLayout';
import { postDTO } from '../../api/postApi/postConstructor';

export const UserProfile: FC = () => {
  const router = useRouter();
  const currentUser = router.query.id;
  const UserId = useSelector(userIdSelector);

  const { data: postData, isLoading: isPostsQueryLoading } = useGetPostsByUserIdQuery(currentUser);
  const { data: userData, isLoading: isUserQueryLoading } = useGetUserQuery(currentUser);

  const isMine = currentUser === UserId;

  const userInfo = isUserQueryLoading ? (
    <Skeleton avatar paragraph={{ rows: 0 }} />
  ) : (
    <UserInfo userData={userData} isMine={isMine} />
  );

  const posts = isPostsQueryLoading ? (
    <Spin />
  ) : (
    postData.map((post: postDTO) => {
      return <Post key={post.id} {...post} {...userData} id={post.id} />;
    })
  );

  return (
    <UserProfileLayout userInfo={userInfo} postPublishPanel={<PostPublishPanel />} posts={posts} />
  );
};
