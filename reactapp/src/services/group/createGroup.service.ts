import { GroupWithMemberId } from "./../../models/GroupWithMemberId";
import axiosInstance from "../../utils/Api/axios";
import { Group } from "../../models";

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
