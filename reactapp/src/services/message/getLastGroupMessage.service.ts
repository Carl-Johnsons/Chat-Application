import { GroupMessage } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 *
 * @param groupId
 * @param receiverId
 * @returns
 */
export const getLastGroupMessage = async (
  groupId: number
): Promise<[GroupMessage | null, unknown]> => {
  try {
    const url = "/api/Messages/GetLastGroupMessage/" + groupId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
