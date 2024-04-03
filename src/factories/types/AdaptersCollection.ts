import { ApplicationRepository } from '~/core/interfaces/ApplicationRepository';
import { GroupRepository } from '~/core/interfaces/GroupRepository';
import { GroupRoleRepository } from '~/core/interfaces/GroupRoleRepository';
import { Logger } from '~/core/interfaces/Logger';
import { PasswordEncoder } from '~/core/interfaces/PasswordEncoder';
import { ProfileRepository } from '~/core/interfaces/ProfileRepository';
import { ReadApplicationRepository } from '~/core/interfaces/ReadApplicationRepository';
import { ReadGroupRepository } from '~/core/interfaces/ReadGroupRepository';
import { ReadGroupRoleRepository } from '~/core/interfaces/ReadGroupRoleRepository';
import { ReadProfileRepository } from '~/core/interfaces/ReadProfileRepository';
import { ReadUserRepository } from '~/core/interfaces/ReadUserRepository';
import { UserRepository } from '~/core/interfaces/UserRepository';

export type AdaptersCollection = {
  applicationRepository: ApplicationRepository;
  profileRepository: ProfileRepository;
  userRepository: UserRepository;
  groupRepository: GroupRepository;
  groupRoleRepository: GroupRoleRepository;
  logger?: Logger;
  passwordEncoder: PasswordEncoder;

  readAdapters: {
    applicationRepository: ReadApplicationRepository;
    profileRepository: ReadProfileRepository;
    userRepository: ReadUserRepository;
    groupRepository: ReadGroupRepository;
    groupRoleRepository: ReadGroupRoleRepository;
    logger?: Logger;
    passwordEncoder: PasswordEncoder;
  };
};
