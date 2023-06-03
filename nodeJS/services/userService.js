import { User } from '../models/models.js';
import fileServise from './fileServise.js';

class UserService {
  async getUser(id) {
    const user = await User.findOne({ where: { id } });

    return user;
  }

  async patchUser(id, about, avatar) {
    const changedUser = await User.findOne({ where: { id } });

    console.log(changedUser, 'changedUser');
    console.log(avatar, 'avatar');

    if (changedUser.img) {
      await fileServise.deleteFile(changedUser.img);
    }

    if (avatar) {
      changedUser.img = avatar.filename;
    }

    if (about) {
      changedUser.about = about;
    }

    await changedUser.save();

    return changedUser;
  }
}

export default new UserService();
