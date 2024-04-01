import { RemoveGroupError } from './errors/RemoveGroupError';
import { GroupRepository } from './interfaces/GroupRepository';
import { GroupRoleRepository } from './interfaces/GroupRoleRepository';
import { Logger } from './interfaces/Logger';

export type RemoveGroupAdapters = {
  logger?: Logger;
  groupRepository: GroupRepository;
  groupRoleRepository: GroupRoleRepository;
};

export async function removeGroup(groupId: string, adapters: RemoveGroupAdapters) {
  const { logger, groupRoleRepository, groupRepository } = adapters;

  const savedGroup = await groupRepository.get(groupId);
  if (!savedGroup) return;

  try {
    if (savedGroup.roles && savedGroup.roles.length > 0) await groupRoleRepository.removeByIds(savedGroup.roles);
    await groupRepository.remove(groupId);
    return;
  } catch (e: any) {
    const error = new RemoveGroupError(groupId, e.message);
    logger?.error(error);
    throw error;
  }
}
