import { HttpError } from './HttpError';

export class ProfileNotFound extends HttpError {
  constructor(profileId: string) {
    const message = `The profile ${profileId} could not be found`;
    super(message, 404);
  }
}
