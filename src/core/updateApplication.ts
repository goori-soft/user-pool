import _ from 'lodash';
import { ApplicationModifier, SavedApplication } from './types/Application';
import { Logger } from './interfaces/Logger';
import { ApplicationRepository } from './interfaces/ApplicationRepository';
import { ApplicationNotFound } from './errors/ApplicationNotFound';
import { UpdateApplicationValidationError } from './errors/UpdateApplicationValidationError';
import { UpdateApplicationError } from './errors/UpdateApplicationError';

export type UpdateApplicationAdapters = {
  logger?: Logger;
  applicationRepository: ApplicationRepository;
};

export async function updateApplication(modifier: ApplicationModifier, adapters: UpdateApplicationAdapters) {
  const { logger, applicationRepository } = adapters;
  const sanitizedModifier = _.pick(modifier, ['id', 'defaultProfile', 'description', 'email', 'name', 'url']);

  const savedApplication = await applicationRepository.get(modifier.id);
  if (!savedApplication) {
    const error = new ApplicationNotFound(modifier.id);
    logger?.error(error);
    throw error;
  }

  if (modifier.email && savedApplication.email !== modifier.email) {
    const existentApplication = await applicationRepository.getByEmail(modifier.email);
    if (existentApplication) {
      const error = new UpdateApplicationValidationError(`The email ${modifier.email} is already in use`);
      logger?.error(error);
      throw error;
    }
  }

  const newApplication: SavedApplication = {
    ...savedApplication,
    ...sanitizedModifier,
  };

  try {
    await applicationRepository.update(newApplication);
    return newApplication;
  } catch (e: any) {
    const error = new UpdateApplicationError(modifier.id, e.message);
    logger?.error(error);
    throw error;
  }
}
