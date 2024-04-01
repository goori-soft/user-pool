import { HttpError } from './HttpError';

export class CreateProfileError extends HttpError {
  constructor(profileName: string) {
    const message = `It was not possible to create the profile ${profileName}`;
    super(message);
  }
}
