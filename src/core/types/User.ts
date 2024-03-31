import { GroupRole } from './GroupRole';
import { Profile } from './Profile';

export type User = {
  profiles?: Profile[];
  roles?: GroupRole[];
};
