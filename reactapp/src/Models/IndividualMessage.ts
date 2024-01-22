import { Message, User } from ".";

export type IndividualMessage = {
  messageId: number;
  userReceiverId: number;
  status: string;
  message: Message;
  userReceiver: User;
};
