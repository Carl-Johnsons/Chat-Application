import { User } from ".";

export type Friend = {
  userId: number;
  friendId: number;
  friendNavigation: User;
  user: User;
};
