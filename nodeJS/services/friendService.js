import sequelize from '../db.js';
import { Friend } from '../models/models.js';

class FriendService {
  async inviteFriend(UserId, FriendId) {
    const friendRequest = await Friend.create({ UserId, FriendId });

    return friendRequest;
  }

  async getFriends(UserId) {
    const friends = await sequelize.query(
      `SELECT
       "friends"."id", "friends"."status","friends"."UserId", "friends"."FriendId",
       "users"."name" , "users"."img"
       FROM "friends" JOIN "users" ON "friends"."FriendId" = "users"."id"
       WHERE ("UserId" = :UserId OR "FriendId" = :UserId) AND "friends"."status" = 'accepted'
			 `,
      {
        replacements: { UserId },
      },
    );

    const countOfFriends = await sequelize.query(
      `SELECT COUNT(*) FROM friends WHERE ("UserId" = :UserId OR "FriendId" = :UserId) AND "status" = 'accepted'`,
      {
        replacements: { UserId },
      },
    );

    return { friends: friends[0], countOfFriends: countOfFriends[0][0].count };
  }

  async respondToFriendRequest(FriendId, status) {
    const friendRequest = await Friend.update({ status }, { where: { FriendId } });

    return friendRequest;
  }
}

export default new FriendService();
