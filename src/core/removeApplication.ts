import { RemoveApplicationError } from './errors/RemoveApplicationError';
import { ApplicationRepository } from './interfaces/ApplicationRepository';
import { Logger } from './interfaces/Logger';
import { ProfileRepository } from './interfaces/ProfileRepository';

export type RemoveApplicationAdapters = {
  logger?: Logger;
  applicationRepository: ApplicationRepository;
  profileRepository: ProfileRepository;
};

export async function removeApplication(applicationId: string, adapters: RemoveApplicationAdapters) {
  const { logger, applicationRepository, profileRepository } = adapters;

  const savedApplication = await applicationRepository.get(applicationId);
  if (!savedApplication) return;

  try {
    if (savedApplication.profiles && savedApplication.profiles.length > 0)
      await profileRepository.removeByIds(savedApplication.profiles);
    await applicationRepository.remove(applicationId);
    return;
  } catch (e: any) {
    const error = new RemoveApplicationError(applicationId, e.message);
    logger?.error(error);
    throw error;
  }
}
