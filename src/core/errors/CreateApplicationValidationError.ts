import { HttpError } from './HttpError';

export class CreateApplicationValidationError extends HttpError {
  constructor(validationErrorMessage: string) {
    const message = `It was not possible to create the application.\nBe sure to pass a valid application information.\n${validationErrorMessage}`;
    super(message, 400);
  }
}
