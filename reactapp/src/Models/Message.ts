import { User } from ".";

export interface Message {
  messageId: number;
  senderId: number;
  content: string;
  time: string;
  messageType: string;
  messageFormat: string;
  active: boolean;
  sender: User;
}
