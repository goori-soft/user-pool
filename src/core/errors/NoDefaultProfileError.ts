import { HttpError } from './HttpError';

export class NoDefaultProfileError extends HttpError {
  constructor(applicationName: string) {
    const message = `The application ${applicationName} has no default profile`;
    super(message);
  }
}
