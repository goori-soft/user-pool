import { HttpError } from './HttpError';

export class RemoveGroupRoleError extends HttpError {
  constructor(roleId: string, originalErrorMessage?: string) {
    let message = `It was not possible to remove the role ${roleId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
