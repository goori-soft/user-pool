import { HttpError } from './HttpError';

export class NotValidTokenError extends HttpError {
  constructor() {
    const message = 'Token is not valid';
    super(message, 401);
  }
}
