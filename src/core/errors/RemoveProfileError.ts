import { HttpError } from './HttpError';

export class RemoveProfileError extends HttpError {
  constructor(profileId: string, originalErrorMessage?: string) {
    let message = `It was not possible to remove the profile ${profileId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
