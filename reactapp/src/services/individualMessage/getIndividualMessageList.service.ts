import { IndividualMessage } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
export const getIndividualMessageList = async (
  senderId: number,
  receiverId: number
): Promise<[IndividualMessage[] | null, unknown]> => {
  try {
    const url = `/api/Messages/individual/${senderId}/${receiverId}`;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
