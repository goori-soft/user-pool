import { HttpError } from './HttpError';

export class CreateGroupRoleValidationError extends HttpError {
  constructor(validationErrorMessage: string) {
    const message = `It was not possible to create the role.\nBe sure to pass a valid group role information.\n${validationErrorMessage}`;
    super(message, 400);
  }
}
