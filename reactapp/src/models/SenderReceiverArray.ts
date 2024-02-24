import { MessageType } from ".";

export type SenderReceiverArray = {
  senderId: number;
  receiverId: number;
  type: MessageType;
};
