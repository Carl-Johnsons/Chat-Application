import { GroupMessage } from "@/models";
import { axiosInstance } from "@/utils";

/**
 * @param {number} groupId
 * @returns
 */
export const getGroupMessageList = async (
  groupId: number
): Promise<GroupMessage[] | null> => {
  const url = "/api/Messages/group/" + groupId;
  const response = await axiosInstance.get(url);
  return response.data;
};
