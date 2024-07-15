import { GroupConversation, Message } from "..";

export type ConversationResponseDTO = {
  conversations: BaseConversationResponseDTO[];
};

export type BaseConversationResponseDTO = GroupConversation & {
  lastMessage: Message;
};
