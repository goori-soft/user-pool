import { HttpError } from './HttpError';

export class UpdateGroupRoleError extends HttpError {
  constructor(roleId: string, originalErrorMessage?: string) {
    let message = `It was not possible to update the role ${roleId}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
