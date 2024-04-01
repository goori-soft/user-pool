import { HttpError } from './errors/HttpError';
import { Logger } from './interfaces/Logger';
import { ReadGroupRoleRepository } from './interfaces/ReadGroupRoleRepository';

export type GetGroupRolesOptions = {
  groupId: string;
  limit?: number;
  page?: number;
};

export type GetGroupRolesAdapters = {
  logger?: Logger;
  groupRoleRepository: ReadGroupRoleRepository;
};

export async function getGroupRoles(options: GetGroupRolesOptions, adapters: GetGroupRolesAdapters) {
  const { logger, groupRoleRepository } = adapters;

  try {
    return await groupRoleRepository.list(options);
  } catch (e: any) {
    const error = new HttpError(e.message, 500);
    logger?.error(error);
    throw error;
  }
}
