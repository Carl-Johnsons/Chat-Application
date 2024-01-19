import { User } from ".";

export interface FriendRequest {
  senderId: number;
  receiverId: number;
  content: string;
  date: string;
  status: string;
  receiver: null;
  sender: User;
}
