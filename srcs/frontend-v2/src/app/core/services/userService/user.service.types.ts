import { User } from '../../state/user/user.state.types';
import { AuthentificationServiceRegisterProp } from '../authentificationService/authentification.service.types';

export interface UserStats {
  isPrivate: boolean;
  lostMatches: number;
  wonMatches: number;
  totalMatches: number;
  user: Pick<
    User,
    'PlayerID' | 'Admin' | 'DisplayName' | 'Private' | 'LastAlive'
  >;
}

export type UpdateUserProfileProp =
  Partial<AuthentificationServiceRegisterProp>;
