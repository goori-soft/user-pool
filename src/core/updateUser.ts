import _ from 'lodash';
import { UserNotFound } from './errors/UserNotFound';
import { Logger } from './interfaces/Logger';
import { UserRepository } from './interfaces/UserRepository';
import { UserModifier } from './types/User';
import { UpdateUserError } from './errors/UpdateUserError';

export type UpdateUserAdapters = {
  logger?: Logger;
  userRepository: UserRepository;
};

export async function updateUser(modifier: UserModifier, adapters: UpdateUserAdapters) {
  const { logger, userRepository } = adapters;

  const savedUser = await userRepository.get(modifier.id);
  if (!savedUser) {
    const error = new UserNotFound(modifier.id);
    logger?.error(error);
    throw error;
  }

  const sanitizedModifier = _.pick(modifier, ['name', 'email', 'bio']);
  const newUser = {
    ...savedUser,
    ...sanitizedModifier,
  };

  try {
    await userRepository.update(newUser);
    return;
  } catch (e: any) {
    const error = new UpdateUserError(modifier.id, e.message);
    logger?.error(error);
    throw error;
  }
}
