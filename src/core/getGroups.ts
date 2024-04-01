import { HttpError } from './errors/HttpError';
import { Logger } from './interfaces/Logger';
import { ReadGroupRepository } from './interfaces/ReadGroupRepository';

export type GetGroupsOptions = {
  applicationId: string;
  limit?: number;
  page?: number;
};

export type GetGroupsAdapters = {
  logger?: Logger;
  groupRepository: ReadGroupRepository;
};

export async function getGroups(options: GetGroupsOptions, adapters: GetGroupsAdapters) {
  const { logger, groupRepository } = adapters;

  try {
    return await groupRepository.list(options);
  } catch (e: any) {
    const error = new HttpError(e.message, 500);
    logger?.error(error);
    throw error;
  }
}
