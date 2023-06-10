import { User } from '../models/models.js';
import fileServise from './fileServise.js';
import { Op } from 'sequelize';

class UserService {
  async getUser(id) {
    const user = await User.findOne({ where: { id } });

    return user;
  }

  async searchUsersByName(searchText, limit, page) {
    const querySearchText = searchText + '%';
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: querySearchText,
            },
          },
          {
            surname: {
              [Op.iLike]: querySearchText,
            },
          },
        ],
      },

      limit: limit,
      offset,
    });

    const meta = {
      totalCount: users.count,
      totalPages: Math.ceil(users.count / limit),
      page,
    };

    return { users: users.rows, meta };
  }

  async searchUsers(limit, page) {
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
      limit,
      offset,
    });

    const meta = {
      totalCount: users.count,
      totalPages: Math.ceil(users.count / limit),
      page,
    };

    return { users: users.rows, meta };
  }

  async patchUser(id, about, avatar) {
    const changedUser = await User.findOne({ where: { id } });

    if (changedUser.img && avatar) {
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
