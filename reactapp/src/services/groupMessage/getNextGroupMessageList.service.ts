import { GroupMessage } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 * @param {number} groupId
 * @param {number} skipBatch
 * @returns
 */
export const getNextGroupMessageList = async (
  groupId: number,
  skipBatch: number
): Promise<[GroupMessage[] | null, unknown]> => {
  try {
    const url = `/api/Messages/group/${groupId}/skip/${skipBatch}`;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
