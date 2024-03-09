import { axiosInstance } from "@/utils";
import { GroupMessage } from "@/models";

/**
 * @param {number} groupId
 * @param {number} skipBatch
 * @returns
 */
export const getNextGroupMessageList = async (
  groupId: number,
  skipBatch: number
): Promise<GroupMessage[] | null> => {
  const url = `/api/Messages/group/${groupId}/skip/${skipBatch}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
