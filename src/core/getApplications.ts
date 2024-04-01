import { ReadApplicationRepository, ListOptions } from './interfaces/ReadApplicationRepository';
import { Logger } from './interfaces/Logger';
import { HttpError } from './errors/HttpError';

export type GetApplicationsAdapters = {
  logger?: Logger;
  applicationRepository: ReadApplicationRepository;
};

export async function getApplications(options: ListOptions, adapters: GetApplicationsAdapters) {
  const { logger, applicationRepository } = adapters;
  try {
    return await applicationRepository.list(options);
  } catch (e: any) {
    const error = new HttpError(e.message, 500);
    logger?.error(error);
    throw error;
  }
}
