import { HttpError } from './errors/HttpError';
import { Logger } from './interfaces/Logger';
import { ReadProfileRepository } from './interfaces/ReadProfileRepository';

export type GetProfileOptions = {
  applicationId: string;
  limit?: number;
  page?: number;
};

export type GetProfileAdapters = {
  logger?: Logger;
  profileRepository: ReadProfileRepository;
};

export async function getProfiles(options: GetProfileOptions, adapters: GetProfileAdapters) {
  const { logger, profileRepository } = adapters;
  try {
    return await profileRepository.list(options);
  } catch (e: any) {
    const error = new HttpError(e.message, 500);
    logger?.error(error);
    throw error;
  }
}
