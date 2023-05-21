export default class ApiError extends Error {
  // status;
  // errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnoauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(401, message, errors);
  }
}
