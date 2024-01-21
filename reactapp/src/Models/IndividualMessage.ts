import { Message, User } from ".";

export interface IndividualMessage {
  messageId: number;
  userReceiverId: number;
  status: string;
  message: Message;
  userReceiver: User;
}
