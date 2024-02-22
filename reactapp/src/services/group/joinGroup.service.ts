import { axiosInstance } from "@/utils";
import { GroupUser } from "@/models";

/**
 * @param {number} groupId
 * @param {number} userId
 * @returns
 */
export const joinGroup = async (
  groupId: number,
  userId: number
): Promise<[number | null, unknown]> => {
  const groupUserObject: GroupUser = {
    groupId,
    userId,
  };

  try {
    const url = "/api/Group/Join";
    const respone = await axiosInstance.post(url, groupUserObject);
    return [respone.status, null];
  } catch (error) {
    return [null, error];
  }
};
