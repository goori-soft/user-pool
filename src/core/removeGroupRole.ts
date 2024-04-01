import { RemoveGroupRoleError } from './errors/RemoveGroupRoleError';
import { GroupRoleRepository } from './interfaces/GroupRoleRepository';
import { Logger } from './interfaces/Logger';

export type RemoveGroupRoleAdapters = {
  logger?: Logger;
  groupRoleRepository: GroupRoleRepository;
};

export async function removeGroupRole(roleId: string, adapters: RemoveGroupRoleAdapters) {
  const { logger, groupRoleRepository } = adapters;

  try {
    await groupRoleRepository.remove(roleId);
    return;
  } catch (e: any) {
    const error = new RemoveGroupRoleError(roleId, e.message);
    logger?.error(error);
    throw error;
  }
}
