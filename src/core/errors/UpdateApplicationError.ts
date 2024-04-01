import { HttpError } from './HttpError';

export class UpdateApplicationError extends HttpError {
  constructor(applicationId: string, originalErrorMessage?: string) {
    let message = `It was not possible to update the application ${applicationId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
