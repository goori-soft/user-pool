import { HttpError } from './HttpError';

export class UserNotFound extends HttpError {
  constructor(userId: string) {
    const message = `The user ${userId} could not be found`;
    super(message, 404);
  }
}
