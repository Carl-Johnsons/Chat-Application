import { User } from ".";
import { Conversation } from "./Conversation";
export type ConversationUser = {
  conversationId: string;
  userId: string;
  role: string;
  conversation: Conversation;
  user: User;
};
