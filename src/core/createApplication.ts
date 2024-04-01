import { ApplicationRepository } from './interfaces/ApplicationRepository';
import { Logger } from './interfaces/Logger';
import { Application } from './types/Application';
import { CreateApplicationError } from './errors/CreateApplicationError';
import { CreateApplicationValidationError } from './errors/CreateApplicationValidationError';
import { applicationValidator } from './validators/applicationValidator';

export type CreateApplicationAdapters = {
  applicationRepository: ApplicationRepository;
  logger?: Logger;
};

export async function createApplication(application: Application, adapters: CreateApplicationAdapters) {
  const { applicationRepository, logger } = adapters;

  const validation = applicationValidator.safeParse(application);
  if (!validation.success) {
    const originalErrorMessage = validation.error.message;
    const error = new CreateApplicationValidationError(originalErrorMessage);
    logger?.error(error.message);
    throw error;
  }

  try {
    const savedApplication = applicationRepository.save(application);
    return savedApplication;
  } catch (e: any) {
    const error = new CreateApplicationError(application.name);
    const message = error.message;
    logger?.error(message);
    throw error;
  }
}
