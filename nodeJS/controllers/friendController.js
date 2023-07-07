import friendService from '../services/friendService.js';

class FriendController {
  async getFriends(req, res) {
    try {
      const { UserId } = req.params;

      console.log(UserId);

      const friends = await friendService.getFriends(UserId);

      res.json(friends);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async inviteUser(req, res) {
    try {
      const { UserId, FriendId } = req.body;

      console.log(UserId, FriendId);

      const friendRequest = await friendService.inviteFriend(UserId, FriendId);

      res.json(friendRequest);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async respondToFriendRequest(req, res) {
    try {
      const { FriendId, status } = req.body;

      const responseToFriendRequest = await friendService.respondToFriendRequest(FriendId, status);

      res.json(responseToFriendRequest);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new FriendController();
