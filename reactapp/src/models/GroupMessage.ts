import { Group, Message} from ".";

export type GroupMessage = {
  groupReceiverId: number;
  message: Message;
  messageId?: number;
  status?: string;
  groupReceiver?: Group | null;
};
