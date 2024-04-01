import { HttpError } from './HttpError';

export class CreateUserError extends HttpError {
  constructor(userEmail: string, originalErrorMessage?: string) {
    let message = `It was not possible to create user ${userEmail}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
