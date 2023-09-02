import UserService from '../services/userService.js';

class UserController {
  async getUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await UserService.getUser(id);

      res.json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async searchUsers(req, res, next) {
    try {
      const { query } = req;

      const searchText = String(query.searchText || '');
      const page = Number(query.page);
      const limit = Number(query.limit);

      if (isNaN(page) || isNaN(limit)) {
        return res.json({ results: [], meta: { totalPages: 0, totalResults: 0 } });
      }

      if (!searchText) {
        const users = await UserService.searchUsers(limit, page);

        return res.json(users);
      }

      const users = await UserService.searchUsersByName(searchText, limit, page);

      return res.json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async patchUser(req, res, next) {
    try {
      const { id, about } = req.body;
      const avatar = req.file;

      console.log(id, about, avatar.public_id);

      const changedUser = await UserService.patchUser(id, about, avatar);

      res.json(changedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
