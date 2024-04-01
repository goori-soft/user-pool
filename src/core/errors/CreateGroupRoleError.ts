import { HttpError } from './HttpError';

export class CreateGroupRoleError extends HttpError {
  constructor(roleName: string, originalErrorMessage?: string) {
    let message = `It was not possible to create the role ${roleName}`;
    if (originalErrorMessage) message += `\n${originalErrorMessage}`;
    super(message);
  }
}
