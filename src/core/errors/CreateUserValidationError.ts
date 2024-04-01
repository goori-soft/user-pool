import { HttpError } from './HttpError';

export class CreateUserValidationError extends HttpError {
  constructor(validationErrorMessage: string) {
    const message = `It was not possible to create the user.\nBe sure to pass a valid user information.\n${validationErrorMessage}`;
    super(message, 400);
  }
}
