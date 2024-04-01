import { HttpError } from './HttpError';

export class NoPasswordError extends HttpError {
  constructor(userId: string) {
    const message = `User ${userId} has not password`;
    super(message, 403);
  }
}
