import { Logger } from './interfaces/Logger';
import { ProfileRepository } from './interfaces/ProfileRepository';
import { ApplicationRepository } from './interfaces/ApplicationRepository';
import { Profile } from './types/Profile';
import { CreateProfileValidationError } from './errors/CreateProfileValidationError';
import { ApplicationNotFound } from './errors/ApplicationNotFound';
import { CreateProfileError } from './errors/CreateProfileError';
import { profileValidator } from './validators/profileValidator';

export type CreateProfileAdapters = {
  profileRepository: ProfileRepository;
  applicationRepository: ApplicationRepository;
  logger?: Logger;
};

export async function createProfile(profile: Profile, adapters: CreateProfileAdapters) {
  const { applicationRepository, profileRepository, logger } = adapters;

  const validation = profileValidator.safeParse(profile);
  if (!validation.success) {
    const error = new CreateProfileValidationError(validation.error.message);
    logger?.error(error);
    throw error;
  }

  const savedApplication = await applicationRepository.get(profile.applicationId);
  if (!savedApplication) {
    const error = new ApplicationNotFound(profile.applicationId);
    logger?.error(error);
    throw error;
  }

  try {
    const savedProfile = await profileRepository.save(profile);
    return savedProfile;
  } catch (e: any) {
    const error = new CreateProfileError(profile.name);
    logger?.error(error);
    throw error;
  }
}
