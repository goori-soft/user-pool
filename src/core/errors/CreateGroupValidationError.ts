import { HttpError } from './HttpError';

export class CreateGroupValidationError extends HttpError {
  constructor(validationErrorMessage: string) {
    const message = `It was not possible to create the group.\nBe sure to pass a valid group information.\n${validationErrorMessage}`;
    super(message, 400);
  }
}
