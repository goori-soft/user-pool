import { HttpError } from './HttpError';

export class RemoveUserError extends HttpError {
  constructor(userId: string, originalErrorMessage?: string) {
    let message = `It was not possible to remove user ${userId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
