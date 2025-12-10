import { User } from '../../state/user/user.state.types';

export interface UserStats {
  isPrivate: boolean;
  lostMatches: number;
  winMatches: number;
  totalMatches: number;
  user: Pick<
    User,
    'PlayerID' | 'Admin' | 'DisplayName' | 'Private' | 'LastAlive'
  >;
}
