import { HttpError } from './HttpError';

export class NotAllowedOperationError extends HttpError {
  constructor(operationName: string) {
    super(`Operation not allowed: ${operationName}`, 403);
  }
}
