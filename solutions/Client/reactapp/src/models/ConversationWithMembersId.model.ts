import { Conversation } from ".";

export type ConversationWithMembersId = Conversation & {
  membersId: string[];
  leaderId?: string;
};
