import { useRouter } from 'next/router';
import { FC } from 'react';

import { PostPublishPanel } from './PostPublishPanel';
import { UserProfileView } from './UserProfileView';
import { useGetQuerySkip } from '../../hook/useGetQuerySkip';
import { Posts } from './Posts';
import { UserInfo } from './UserInfo';

export interface IUserProfileInfo {
  currentUser: string | string[];
  isMine: boolean;
  skip: { skip: boolean };
}

export const UserProfile: FC = () => {
  const router = useRouter();
  const currentUser = router.query.id;

  const { UserId, skip } = useGetQuerySkip();

  const isMine = +currentUser === +UserId;

  return (
    <UserProfileView
      postPublishPanel={isMine && <PostPublishPanel />}
      posts={<Posts isMine={isMine} currentUser={currentUser} skip={skip} />}
      userInfo={<UserInfo isMine={isMine} currentUser={currentUser} skip={skip} />}
    />
  );
};
