import ApiError from '../exceptions/apiError.js';
import tokenService from '../services/tokenService.js';

export default function authMiddleware(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnoauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if (!accessToken) {
      return next(ApiError.UnoauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.UnoauthorizedError());
    }

    next();
  } catch (e) {
    return next(ApiError.UnoauthorizedError());
  }
}
