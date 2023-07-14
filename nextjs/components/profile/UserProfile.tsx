import { useRouter } from 'next/router';

import { PostPublishPanel } from './PostPublishPanel';
import { UserProfileView } from './UserProfileView';
import { useGetQuerySkip } from '../../hook/useGetQuerySkip';
import { Posts } from './Posts';
import { UserInfo } from './UserInfo';
import { Friends } from './Friends';

export interface IUserProfileInfo {
  currentUser: string | string[];
  isMine: boolean;
  skip: { skip: boolean };
}

const UserProfile = () => {
  const router = useRouter();
  const currentUser = router.query.id;

  const { UserId } = useGetQuerySkip();

  const skip = {
    skip: currentUser === undefined,
  };

  const isMine = +currentUser === +UserId;

  return (
    <UserProfileView
      postPublishPanel={isMine && <PostPublishPanel />}
      posts={<Posts isMine={isMine} currentUser={currentUser} skip={skip} />}
      userInfo={<UserInfo isMine={isMine} currentUser={currentUser} skip={skip} />}
      social={<Friends isMine={isMine} currentUser={currentUser} skip={skip} />}
    />
  );
};

export default UserProfile;
