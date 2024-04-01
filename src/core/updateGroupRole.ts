import _ from 'lodash';
import { GroupRoleNotFound } from './errors/GroupRoleNotFound';
import { GroupRoleRepository } from './interfaces/GroupRoleRepository';
import { Logger } from './interfaces/Logger';
import { GroupRoleModifier } from './types/GroupRole';
import { UpdateGroupRoleError } from './errors/UpdateGroupRoleError';

export type UpdateGroupRoleAdapters = {
  logger?: Logger;
  groupRoleRepository: GroupRoleRepository;
};

export async function updateGroupRole(modifier: GroupRoleModifier, adapters: UpdateGroupRoleAdapters) {
  const { logger, groupRoleRepository } = adapters;

  const savedGroupRole = await groupRoleRepository.get(modifier.id);
  if (!savedGroupRole) {
    const error = new GroupRoleNotFound(modifier.id);
    logger?.error(error);
    throw error;
  }

  const sanitizedModifier = _.pick(modifier, ['id', 'resources', 'description', 'name']);
  const newRole = {
    ...savedGroupRole,
    ...sanitizedModifier,
  };

  try {
    await groupRoleRepository.update(newRole);
    return;
  } catch (e: any) {
    const error = new UpdateGroupRoleError(modifier.id, e.message);
    logger?.error(error);
    throw error;
  }
}
