import { UpdateUserError } from './errors/UpdateUserError';
import { UserNotFound } from './errors/UserNotFound';
import { Logger } from './interfaces/Logger';
import { PasswordEncoder } from './interfaces/PasswordEncoder';
import { UserRepository } from './interfaces/UserRepository';
import { Credentials } from './types/Credentials';

export type UpdateUserPasswordAdapters = {
  logger?: Logger;
  userRepository: UserRepository;
  passwordEncoder: PasswordEncoder;
};

export async function updateUserPassword(credentials: Credentials, adapters: UpdateUserPasswordAdapters) {
  const { logger, userRepository, passwordEncoder } = adapters;

  const savedUser = await userRepository.getByEmail(credentials.login);
  if (!savedUser) {
    const error = new UserNotFound(credentials.login);
    logger?.error(error);
    throw error;
  }

  const password = await passwordEncoder.hash(credentials.password);
  const newUser = {
    ...savedUser,
    password,
  };

  try {
    await userRepository.update(newUser);
    return;
  } catch (e: any) {
    const error = new UpdateUserError(credentials.login, e.message);
    logger?.error(error);
    throw error;
  }
}
