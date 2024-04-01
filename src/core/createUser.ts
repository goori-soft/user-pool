import { User } from './types/User';
import { ApplicationNotFound } from './errors/ApplicationNotFound';
import { CreateUserError } from './errors/CreateUserError';
import { CreateUserValidationError } from './errors/CreateUserValidationError';
import { NoDefaultProfileError } from './errors/NoDefaultProfileError';
import { ProfileNotFound } from './errors/ProfileNotFound';
import { ApplicationRepository } from './interfaces/ApplicationRepository';
import { Logger } from './interfaces/Logger';
import { ProfileRepository } from './interfaces/ProfileRepository';
import { UserRepository } from './interfaces/UserRepository';
import { userValidator } from './validators/userValidator';
import { PasswordEncoder } from './interfaces/PasswordEncoder';

export type CreateUserAdapters = {
  logger?: Logger;
  applicationRepository: ApplicationRepository;
  profileRepository: ProfileRepository;
  userRepository: UserRepository;
  passwordEncoder: PasswordEncoder;
};

export async function createUser(user: User, applicationId: string, adapters: CreateUserAdapters) {
  const { logger, applicationRepository, profileRepository, userRepository, passwordEncoder } = adapters;

  const validation = userValidator.safeParse(user);
  if (!validation.success) {
    const error = new CreateUserValidationError(validation.error.message);
    logger?.error(error);
    throw error;
  }

  const savedUser = await userRepository.getByEmail(user.email);
  if (savedUser) {
    const error = new CreateUserValidationError('User email already exists');
    logger?.error(error);
    throw error;
  }

  const savedApplication = await applicationRepository.get(applicationId);
  if (!savedApplication) {
    const error = new ApplicationNotFound(applicationId);
    logger?.error(error);
    throw error;
  }

  const defaultProfileId = savedApplication.defaultProfile;
  if (!defaultProfileId) {
    const error = new NoDefaultProfileError(savedApplication.name);
    logger?.error(error);
    throw error;
  }

  const profile = await profileRepository.get(defaultProfileId);
  if (!profile) {
    const error = new ProfileNotFound(defaultProfileId);
    logger?.error(error);
    throw error;
  }

  const profilesList = new Set(...(user.profiles ?? []), defaultProfileId);
  user.profiles = [...profilesList];

  if (user.password) user.password = await passwordEncoder.hash(user.password);

  try {
    const savedUser = await userRepository.save(user);
    return savedUser;
  } catch (e: any) {
    const error = new CreateUserError(user.email, e.message);
    logger?.error(error);
    throw error;
  }
}
