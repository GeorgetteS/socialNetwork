import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { User } from '../models/models.js';
import mailService from './mailService.js';
import tokenService from './tokenService.js';
import { UserDto } from '../dtos/userDto.js';
import ApiError from '../exceptions/apiError.js';

class AuthService {
  async regisration(email, password, name, surname) {
    const condidate = await User.findOne({ where: { email: email } });
    if (condidate) {
      throw ApiError.BadRequest(`Пользователь с таким почтовы адресом ${email} уже существует`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      surname,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/activate/${activationLink}`,
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activation) {
    const user = await User.findOne({ where: { activationLink: activation } });

    if (!user) {
      throw ApiError.BadRequest(`Некорректная ссылка активации!`);
    }

    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest('Пользователь не был найден');
    }

    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Неправильный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnoauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);

    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnoauthorizedError();
    }

    const user = await User.findOne({ where: { id: userData.id } });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new AuthService();
