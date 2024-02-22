import { axiosInstance } from "@/utils";
import { GroupUser } from "@/models";

/**
 * @param {number} userId
 * @returns
 */
export const getGroupUserByUserId = async (
  userId: number
): Promise<[GroupUser[] | null, unknown]> => {
  try {
    const url = "/api/Group/GetGroupUserByUserId/" + userId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
