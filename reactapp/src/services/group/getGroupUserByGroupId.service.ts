import { GroupUser } from "@/models";
import { axiosInstance } from "@/utils";

/**
 * @param {number} groupId
 * @returns
 */
export const getGroupUserByGroupId = async (
  groupId: number
): Promise<[GroupUser[] | null, unknown]> => {
  try {
    const url = "/api/Group/GetGroupUserByGroupId/" + groupId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
