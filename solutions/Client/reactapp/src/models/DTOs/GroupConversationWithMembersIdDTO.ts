import { GroupConversationWithMembersId } from "..";

export type GroupConversationWithMembersIdDTO = {
  membersId: GroupConversationWithMembersId["membersId"];
  name: GroupConversationWithMembersId["name"];
  imageFile: Blob;
  inviteUrl: GroupConversationWithMembersId["inviteUrl"];
};
