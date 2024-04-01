import { HttpError } from './HttpError';

export class CreateProfileValidationError extends HttpError {
  constructor(validationErrorMessage: string) {
    const message = `It was not possible to create the profile.\nBe sure to pass a valid profile information.\n${validationErrorMessage}`;
    super(message, 400);
  }
}
