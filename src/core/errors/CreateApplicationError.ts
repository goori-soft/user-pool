import { HttpError } from './HttpError';

export class CreateApplicationError extends HttpError {
  constructor(applicationName: string, originalErrorMessage?: string) {
    let message = `It was not possible to create the application ${applicationName}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
