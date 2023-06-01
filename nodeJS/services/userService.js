import { User } from '../models/models.js';

class UserService {
  async getUser(id) {
    const user = await User.findOne({ where: { id } });

    return user;
  }

  async patchUser(id, about, avatar) {
    const changedUser = await User.findOne({ where: { id } });

    if (avatar) {
      changedUser.img = avatar;
    }

    if (about) {
      changedUser.about = about;
    }

    await changedUser.save();

    return changedUser;
  }
}

export default new UserService();
