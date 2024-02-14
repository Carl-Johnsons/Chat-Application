import { Group } from ".";

export type GroupWithMemberId = Group & {
  groupLeaderId: number;
  groupMembers: number[];
};
