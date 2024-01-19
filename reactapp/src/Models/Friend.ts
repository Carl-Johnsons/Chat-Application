import { User } from ".";

export interface Friend {
  userId: number;
  friendId: number;
  friendNavigation: User;
  user: User;
}
