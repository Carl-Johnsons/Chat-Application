import { Conversation } from ".";

export type ConversationWithMembersId = Conversation & {
  membersId: number[];
  leaderId?: number;
};
