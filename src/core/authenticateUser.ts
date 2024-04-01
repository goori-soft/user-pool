import _ from 'lodash';
import { NoPasswordError } from './errors/NoPasswordError';
import { UserNotFound } from './errors/UserNotFound';
import { WrongPasswordError } from './errors/WrongPasswordError';
import { Logger } from './interfaces/Logger';
import { PasswordEncoder } from './interfaces/PasswordEncoder';
import { UserRepository } from './interfaces/UserRepository';
import { Credentials } from './types/Credentials';

export type AuthenticateUserAdapters = {
  logger?: Logger;
  userRepository: UserRepository;
  passwordEncoder: PasswordEncoder;
};

export async function authenticateUser(credentials: Credentials, adapters: AuthenticateUserAdapters) {
  const { logger, userRepository, passwordEncoder } = adapters;

  const savedUser = await userRepository.getByEmail(credentials.login);
  if (!savedUser) {
    const error = new UserNotFound(credentials.login);
    logger?.error(error);
    throw error;
  }

  if (!savedUser.password) {
    const error = new NoPasswordError(credentials.login);
    logger?.error(error);
    throw error;
  }

  const passwordCompare = await passwordEncoder.compare(credentials.password, savedUser.password);
  if (!passwordCompare) {
    const error = new WrongPasswordError();
    logger?.error(error);
    throw error;
  }

  const restrictUserInfo = _.pick(savedUser, ['id', 'email']);
  const token = await passwordEncoder.tokenize(restrictUserInfo);
  return token;
}
