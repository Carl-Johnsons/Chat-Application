import { Conversation, GroupConversation } from "..";

export type ConversationResponseDTO = {
  conversations: Conversation[];
  groupConversations: GroupConversation[];
};
