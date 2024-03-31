import { ApplicationId } from './ApplicationId';
import { User } from './User';
import { GroupRole } from './GroupRole';

export type Group = {
  application: ApplicationId;
  owner: User;
  roles: GroupRole[];
};
