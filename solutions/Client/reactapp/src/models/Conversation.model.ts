import { ConversationUser } from ".";
import { ConversationType } from "./ConversationType.model";

export type Conversation = {
  id: string;
  type: ConversationType;
  createdAt: Date;
  updatedAt: Date;
  users: ConversationUser[];
};
