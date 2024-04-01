import { HttpError } from './HttpError';

export class UpdateProfileError extends HttpError {
  constructor(profileId: string, originalErrorMessage?: string) {
    let message = `It was not possible to update the profile ${profileId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
