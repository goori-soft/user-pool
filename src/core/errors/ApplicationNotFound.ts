import { HttpError } from './HttpError';

export class ApplicationNotFound extends HttpError {
  constructor(applicationId: string) {
    const message = `The application ${applicationId} could not be found`;
    super(message, 404);
  }
}
