import { HttpError } from './HttpError';

export class RemoveApplicationError extends HttpError {
  constructor(applicationId: string, originalErrorMessage?: string) {
    let message = `It was not possible to remove the application ${applicationId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
