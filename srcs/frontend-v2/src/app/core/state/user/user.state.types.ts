export interface User {
  PlayerID: string;
  DisplayName: string;
  EmailAddress?: string;
  FriendsList?: string[];
  Private: number;
  LastAlive: number;
  Admin: number;
  Avatar?: string;
}
