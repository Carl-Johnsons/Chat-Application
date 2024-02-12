import { MessageType, User } from ".";

export type Message = {
  messageId?: number;
  senderId: number;
  content: string;
  time?: string;
  messageType: MessageType;
  messageFormat: string;
  active: boolean;
  sender?: User | null;
};
