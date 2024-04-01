import { HttpError } from './HttpError';

export class UpdateUserError extends HttpError {
  constructor(userId: string, originalErrorMessage?: string) {
    let message = `It was not possible to update the user ${userId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
