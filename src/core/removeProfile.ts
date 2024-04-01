import { RemoveProfileError } from './errors/RemoveProfileError';
import { Logger } from './interfaces/Logger';
import { ProfileRepository } from './interfaces/ProfileRepository';

export type RemoveProfileAdapters = {
  logger?: Logger;
  profileRepository: ProfileRepository;
};

export async function removeProfile(profileId: string, adapters: RemoveProfileAdapters) {
  const { logger, profileRepository } = adapters;
  try {
    await profileRepository.remove(profileId);
    return;
  } catch (e: any) {
    const error = new RemoveProfileError(profileId, e.message);
    logger?.error(error);
    throw error;
  }
}
