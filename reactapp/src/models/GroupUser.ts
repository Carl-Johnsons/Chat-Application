import { Group, User } from ".";

export type GroupUser = {
  groupId: number;
  userId: number;
  role?: "Leader" | "Deputy" | "Member";
  user?: User;
  group?: Group;
};
