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

  async patchUser(req, res, next) {
    try {
      const { id, about } = req.body;
      const avatar = req.file;

      // const newAvatar = avatar ? avatar.filename : null;

      const changedUser = await UserService.patchUser(id, about, avatar);

      res.json(changedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
