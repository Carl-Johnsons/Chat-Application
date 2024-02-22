import { Group, GroupWithMemberId } from "@/models";
import { axiosInstance } from "@/utils";

/**
 * @param {GroupWithMemberId} groupWithMemberId
 * @returns
 */
export const createGroup = async (
  groupWithMemberId: GroupWithMemberId
): Promise<[Group | null, unknown]> => {
  try {
    const url = "/api/Group";
    const respone = await axiosInstance.post(url, groupWithMemberId);
    return [respone.data, null];
  } catch (error) {
    return [null, error];
  }
};
