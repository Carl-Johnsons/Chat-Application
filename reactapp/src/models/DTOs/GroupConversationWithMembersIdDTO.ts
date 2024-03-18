import { GroupConversationWithMembersId } from "..";

export type GroupConversationWithMembersIdDTO = {
  membersId: GroupConversationWithMembersId["membersId"];
  leaderId: GroupConversationWithMembersId["leaderId"];
  name: GroupConversationWithMembersId["name"];
  imageURL: GroupConversationWithMembersId["imageURL"];
  inviteUrl: GroupConversationWithMembersId["inviteUrl"];
};
