import { CreateGroupRoleError } from './errors/CreateGroupRoleError';
import { CreateGroupRoleValidationError } from './errors/CreateGroupRoleValidationError';
import { GroupNotFound } from './errors/GroupNotFound';
import { GroupRepository } from './interfaces/GroupRepository';
import { GroupRoleRepository } from './interfaces/GroupRoleRepository';
import { Logger } from './interfaces/Logger';
import { GroupRole } from './types/GroupRole';
import { groupRoleValidator } from './validators/groupRoleValidator';

export type CreateGroupRoleAdapters = {
  logger?: Logger;
  groupRepository: GroupRepository;
  groupRoleRepository: GroupRoleRepository;
};

export async function createGroupRole(role: GroupRole, adapters: CreateGroupRoleAdapters) {
  const { logger, groupRepository, groupRoleRepository } = adapters;

  const validation = groupRoleValidator.safeParse(role);
  if (!validation.success) {
    const error = new CreateGroupRoleValidationError(validation.error.message);
    logger?.error(error);
    throw error;
  }

  const savedGroup = await groupRepository.get(role.groupId);
  if (!savedGroup) {
    const error = new GroupNotFound(role.groupId);
    logger?.error(error);
    throw error;
  }

  try {
    const savedRole = await groupRoleRepository.save(role);
    return savedRole;
  } catch (e: any) {
    const error = new CreateGroupRoleError(role.name, e.message);
    logger?.error(error);
    throw error;
  }
}
