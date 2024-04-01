import { HttpError } from './HttpError';

export class CreateGroupError extends HttpError {
  constructor(groupName: string, originalErrorMessage?: string) {
    let message = `It was not possible to create the group ${groupName}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
