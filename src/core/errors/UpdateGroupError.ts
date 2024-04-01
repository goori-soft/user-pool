import { HttpError } from './HttpError';

export class UpdateGroupError extends HttpError {
  constructor(groupId: string, originalErrorMessage?: string) {
    let message = `It was not possible to update the group ${groupId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
