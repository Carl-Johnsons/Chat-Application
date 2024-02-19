import { IndividualMessage } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 * @param {number} groupId
 * @returns
 */
export const getGroupMessageList = async (
  groupId: number
): Promise<[IndividualMessage[] | null, unknown]> => {
  try {
    const url = "/api/Messages/group/" + groupId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
