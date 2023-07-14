import { FriendConstructor, friendDTO } from './friendConstructor';

export class GetFriendsQuery {
  query = (id) => `friends/${id}`;

  transformResponse = (response) => {
    try {
      const { friends, countOfFriends } = response;

      const friendsList = friends.map((friendData) =>
        new FriendConstructor(friendData).getField(),
      ) as friendDTO[];

      return { friendsList, countOfFriends };
    } catch (e) {
      console.log(e);
    }
  };
}
