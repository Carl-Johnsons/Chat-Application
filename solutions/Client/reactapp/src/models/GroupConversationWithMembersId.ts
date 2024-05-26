import { Conversation } from ".";
import { GroupConversation } from "./GroupConversation";

export type GroupConversationWithMembersId = Conversation &
  GroupConversation & {
    membersId: string[];
  };
