import { Conversation } from ".";
import { GroupConversation } from "./GroupConversation.model";

export type GroupConversationWithMembersId = Conversation &
  GroupConversation & {
    membersId: string[];
  };
