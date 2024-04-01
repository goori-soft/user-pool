import { HttpError } from './HttpError';

export class GroupNotFound extends HttpError {
  constructor(groupId: string) {
    const message = `The group ${groupId} could not be found`;
    super(message, 404);
  }
}
