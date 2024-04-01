import { RefuseRemoveUserError } from './errors/RefuseRemoveUserError';
import { RemoveUserError } from './errors/RemoveUserError';
import { GroupRepository } from './interfaces/GroupRepository';
import { Logger } from './interfaces/Logger';
import { UserRepository } from './interfaces/UserRepository';

export type RemoveUserAdapters = {
  logger?: Logger;
  groupRepository: GroupRepository;
  userRepository: UserRepository;
};

export async function removeUser(userId: string, adapters: RemoveUserAdapters) {
  const { logger, groupRepository, userRepository } = adapters;

  const groups = await groupRepository.getByOwner(userId);
  if (groups.length > 0) {
    const error = new RefuseRemoveUserError(userId, 'This user is owner of one or more groups');
    logger?.error(error);
    throw error;
  }

  try {
    await userRepository.remove(userId);
    return;
  } catch (e: any) {
    const error = new RemoveUserError(userId, e.message);
    logger?.error(error);
    throw error;
  }
}
