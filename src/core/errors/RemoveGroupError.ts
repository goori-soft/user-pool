import { HttpError } from './HttpError';

export class RemoveGroupError extends HttpError {
  constructor(groupId: string, originalErrorMessage?: string) {
    let message = `It was not possible to remove the group ${groupId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
