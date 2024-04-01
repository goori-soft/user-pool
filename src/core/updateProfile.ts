import _ from 'lodash';
import { ProfileNotFound } from './errors/ProfileNotFound';
import { Logger } from './interfaces/Logger';
import { ProfileRepository } from './interfaces/ProfileRepository';
import { ProfileModifier } from './types/Profile';
import { UpdateProfileError } from './errors/UpdateProfileError';

export type UpdateProfileAdapters = {
  logger?: Logger;
  profileRepository: ProfileRepository;
};

export async function updateProfile(modifier: ProfileModifier, adapters: UpdateProfileAdapters) {
  const { logger, profileRepository } = adapters;

  const savedProfile = await profileRepository.get(modifier.id);
  if (!savedProfile) {
    const error = new ProfileNotFound(modifier.id);
    logger?.error(error);
    throw error;
  }

  const sanitizedModifier = _.pick(modifier, ['id', 'resources', 'description', 'name']);
  const newProfile = {
    ...savedProfile,
    ...sanitizedModifier,
  };

  try {
    await profileRepository.update(newProfile);
    return;
  } catch (e: any) {
    const error = new UpdateProfileError(modifier.id, e.message);
    logger?.error(error);
    throw error;
  }
}
