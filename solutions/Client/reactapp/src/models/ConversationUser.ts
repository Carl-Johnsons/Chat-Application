import { User } from ".";
import { Conversation } from "./Conversation";
export type ConversationUser = {
  conversationId: number;
  userId: number;
  role: string;
  conversation: Conversation;
  user: User;
};
