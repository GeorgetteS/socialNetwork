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

  const { data: postData } = useGetPostsByUserIdQuery(currentUser);
  const { data: userData, isLoading: isUserQueryLoading } = useGetUserQuery(currentUser);

  const isMine = +currentUser === +UserId;

  const userInfo = isUserQueryLoading ? (
    <Skeleton avatar paragraph={{ rows: 0 }} />
  ) : (
    <UserInfo {...userData} isMine={isMine} />
  );

  const posts = postData ? (
    postData.map((post: postDTO) => {
      return <Post key={post.id} {...post} {...userData} id={post.id} />;
    })
  ) : (
    <Spin />
  );

  return (
    <UserProfileLayout
      userInfo={userInfo}
      postPublishPanel={isMine && <PostPublishPanel />}
      posts={posts}
    />
  );
};
