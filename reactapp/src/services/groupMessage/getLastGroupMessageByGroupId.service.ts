import { GroupMessage } from "@/models";
import { axiosInstance } from "@/utils";

/**
 *
 * @param groupId
 * @param receiverId
 * @returns
 */
export const getLastGroupMessageByGroupId = async (
  groupId: number
): Promise<[GroupMessage | null, unknown]> => {
  try {
    const url = "/api/Messages/group/GetLastByGroupId/" + groupId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
