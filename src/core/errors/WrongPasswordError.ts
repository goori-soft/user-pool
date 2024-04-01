import { HttpError } from './HttpError';

export class WrongPasswordError extends HttpError {
  constructor() {
    const message = 'Password does not match';
    super(message, 401);
  }
}
