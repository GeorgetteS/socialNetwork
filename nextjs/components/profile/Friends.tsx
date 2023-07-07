import { useRouter } from 'next/router';
import { Avatar, Card } from 'antd';

import { useGetFriendsQuery } from '../../restApi/friendApi/friendApi';
import { IUserProfileInfo } from './UserProfile';

import styles from '../../styles/Friends.module.css';

export const Friends = ({ currentUser, skip }: IUserProfileInfo) => {
  const { data: friendsData, isLoading, isSuccess } = useGetFriendsQuery(currentUser, skip);

  if (isLoading) return;

  if (!isSuccess) return;

  const { friendsList = [], countOfFriends = null } = friendsData;

  console.log(friendsList, 'friendsList');

  return (
    <div className={styles.root}>
      <Card title={'Друзья ' + countOfFriends}>
        <div className={styles.container}>
          {friendsList.map((friend) => {
            return (
              <FriendCard
                key={friend.id}
                FriendId={friend.FriendId}
                name={friend.name}
                avatar={friend.avatar}
              />
            );
          })}
        </div>
      </Card>
    </div>
  );
};

const FriendCard = ({ avatar, name, FriendId }) => {
  const router = useRouter();

  const linkToFriend = () => {
    router.push('/profile/' + FriendId);
  };

  return (
    <div onClick={linkToFriend}>
      <Avatar src={avatar || '/noAvatar.svg'} size={66} />
      <span>{name}</span>
    </div>
  );
};
