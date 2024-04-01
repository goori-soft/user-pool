import { HttpError } from './errors/HttpError';
import { Logger } from './interfaces/Logger';
import { ReadUserRepository } from './interfaces/ReadUserRepository';

export type GetUserOptions = {
  applicationId: string;
  profileId?: string | string[];
  limit?: number;
  page?: number;
};

export type GetUserAdapters = {
  logger?: Logger;
  userRepository: ReadUserRepository;
};

export async function getUsers(options: GetUserOptions, adapters: GetUserAdapters) {
  const { logger, userRepository } = adapters;

  try {
    return await userRepository.list(options);
  } catch (e: any) {
    const error = new HttpError(e.message, 500);
    logger?.error(error);
    throw error;
  }
}
