import { IndividualMessage } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 * @param {number} senderId
 * @param {number} receiverId
 * @param {number} skipBatch
 * @returns
 */
export const getNextIndividualMessageList = async (
  senderId: number,
  receiverId: number,
  skipBatch: number
): Promise<[IndividualMessage[] | null, unknown]> => {
  try {
    const url = `/api/Messages/GetIndividualMessage/${senderId}/${receiverId}/skip/${skipBatch}`;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
