import { Group } from './types/Group';
import { ApplicationNotFound } from './errors/ApplicationNotFound';
import { CreateGroupError } from './errors/CreateGroupError';
import { CreateGroupValidationError } from './errors/CreateGroupValidationError';
import { UserNotFound } from './errors/UserNotFound';
import { ApplicationRepository } from './interfaces/ApplicationRepository';
import { GroupRepository } from './interfaces/GroupRepository';
import { Logger } from './interfaces/Logger';
import { UserRepository } from './interfaces/UserRepository';
import { groupValidator } from './validators/groupValidator';

export type CreateGroupAdapters = {
  applicationRepository: ApplicationRepository;
  groupRepository: GroupRepository;
  userRepository: UserRepository;
  logger?: Logger;
};

export async function createGroup(group: Group, adapters: CreateGroupAdapters) {
  const { logger, applicationRepository, userRepository, groupRepository } = adapters;

  const validation = groupValidator.safeParse(group);
  if (!validation.success) {
    const error = new CreateGroupValidationError(validation.error.message);
    logger?.error(error);
    throw error;
  }

  const savedApplication = await applicationRepository.get(group.applicationId);
  if (!savedApplication) {
    const error = new ApplicationNotFound(group.applicationId);
    logger?.error(error);
    throw error;
  }

  const savedUser = await userRepository.get(group.owner);
  if (!savedUser) {
    const error = new UserNotFound(group.owner);
    logger?.error(error);
    throw error;
  }

  try {
    const savedGroup = await groupRepository.save(group);
    return savedGroup;
  } catch (e: any) {
    const error = new CreateGroupError(group.name, e.message);
    logger?.error(error);
    throw error;
  }
}
