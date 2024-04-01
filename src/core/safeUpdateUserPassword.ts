import { NotAllowedOperationError } from './errors/NotAllowedOperationError';
import { NotValidTokenError } from './errors/NotValidtokenError';
import { UpdateUserError } from './errors/UpdateUserError';
import { UserNotFound } from './errors/UserNotFound';
import { Logger } from './interfaces/Logger';
import { PasswordEncoder } from './interfaces/PasswordEncoder';
import { UserRepository } from './interfaces/UserRepository';
import { Credentials } from './types/Credentials';
import { Token } from './types/Token';

export type SafeUpdateUserPasswordAdapters = {
  logger?: Logger;
  userRepository: UserRepository;
  passwordEncoder: PasswordEncoder;
};

export async function safeUpdateUserPassword(
  token: Token,
  credentials: Credentials,
  adapters: SafeUpdateUserPasswordAdapters,
) {
  const { logger, userRepository, passwordEncoder } = adapters;

  const tokenValidation = await passwordEncoder.validateToken(token);
  if (!tokenValidation) {
    const error = new NotValidTokenError();
    logger?.error(error);
  }

  const tokenInfo = await passwordEncoder.decodeToken(token);
  const tokenUser = await userRepository.get(tokenInfo.id);
  if (!tokenUser) {
    const error = new UserNotFound(tokenInfo.id);
    logger?.error(error);
    throw error;
  }

  if (tokenUser.email !== credentials.login) {
    const error = new NotAllowedOperationError('change another user password');
    logger?.error(error);
    throw error;
  }

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
