import _ from 'lodash';
import { GroupNotFound } from './errors/GroupNotFound';
import { GroupRepository } from './interfaces/GroupRepository';
import { Logger } from './interfaces/Logger';
import { GroupModifier } from './types/Group';
import { UpdateGroupError } from './errors/UpdateGroupError';

export type UpdateGroupAdapters = {
  logger?: Logger;
  groupRepository: GroupRepository;
};

export async function updateGroup(modifier: GroupModifier, adapters: UpdateGroupAdapters) {
  const { logger, groupRepository } = adapters;

  const savedGroup = await groupRepository.get(modifier.id);
  if (!savedGroup) {
    const error = new GroupNotFound(modifier.id);
    logger?.error(error);
    throw error;
  }

  const sanitizedModifier = _.pick(modifier, ['id', 'description', 'name', 'owner']);
  const newGroup = {
    ...savedGroup,
    ...sanitizedModifier,
  };

  try {
    await groupRepository.update(newGroup);
    return;
  } catch (e: any) {
    const error = new UpdateGroupError(modifier.id, e.message);
    logger?.error(error);
    throw error;
  }
}
