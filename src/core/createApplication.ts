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
    logger?.error(error);
    throw error;
  }

  const existentApplication = await applicationRepository.getByEmail(application.email);
  if (existentApplication) {
    const error = new CreateApplicationValidationError('Application email is already in use.');
    logger?.error(error);
    throw error;
  }

  try {
    const savedApplication = applicationRepository.save(application);
    return savedApplication;
  } catch (e: any) {
    const error = new CreateApplicationError(application.name, e.message);
    logger?.error(error);
    throw error;
  }
}
