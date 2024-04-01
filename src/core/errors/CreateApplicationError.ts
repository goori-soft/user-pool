import { HttpError } from './HttpError';

export class CreateApplicationError extends HttpError {
  constructor(applicationName: string) {
    const message = `It was not possible to create the application ${applicationName}`;
    super(message);
  }
}
