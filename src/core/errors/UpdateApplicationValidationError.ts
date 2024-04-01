import { HttpError } from './HttpError';

export class UpdateApplicationValidationError extends HttpError {
  constructor(validationErrorMessage: string) {
    const message = `It was not possible to update the application.\n${validationErrorMessage}`;
    super(message, 400);
  }
}
