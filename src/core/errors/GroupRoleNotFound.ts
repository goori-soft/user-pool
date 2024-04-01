import { HttpError } from './HttpError';

export class GroupRoleNotFound extends HttpError {
  constructor(roleId: string) {
    const message = `The role ${roleId} could not be found`;
    super(message, 404);
  }
}
