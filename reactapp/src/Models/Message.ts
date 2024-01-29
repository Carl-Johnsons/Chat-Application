import { User } from ".";

export type Message = {
  messageId: number;
  senderId: number;
  content: string;
  time: string;
  messageType: string;
  messageFormat: string;
  active: boolean;
  sender: User | null;
};
