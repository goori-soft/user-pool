import { HttpError } from './HttpError';

export class RefuseRemoveUserError extends HttpError {
  constructor(userId: string, reason: string) {
    const message = `Unable to remove user.\n${reason}`;
    const code = 409;
    super(message, code);
  }
}
