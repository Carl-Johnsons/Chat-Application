import { GroupConversation } from ".";

export type GroupInvitation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  isExpired: boolean;
  groupConversation: GroupConversation;
};
