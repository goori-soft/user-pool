import { HttpError } from './errors/HttpError';
import { Logger } from './interfaces/Logger';
import { ReadUserRepository } from './interfaces/ReadUserRepository';

export type GetUserByGroupOptions = {
  groupId: string;
  groupRoleId?: string | string[];
  limit?: number;
  page?: number;
};

export type GetUserByGroupAdapters = {
  logger?: Logger;
  userRepository: ReadUserRepository;
};

export async function getUsersByGroup(options: GetUserByGroupOptions, adapters: GetUserByGroupAdapters) {
  const { logger, userRepository } = adapters;

  try {
    return await userRepository.list(options);
  } catch (e: any) {
    const error = new HttpError(e.message, 500);
    logger?.error(error);
    throw error;
  }
}
