import { User } from ".";

export type FriendRequest = {
  senderId: number;
  receiverId: number;
  content: string;
  date: string;
  status: string;
  receiver: null;
  sender: User;
};
