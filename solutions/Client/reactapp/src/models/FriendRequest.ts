import { User } from ".";

export type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  date: string;
  status: string;
  receiver: User | null;
  sender: User;
};
