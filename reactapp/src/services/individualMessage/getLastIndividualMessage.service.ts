import { IndividualMessage } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 *
 * @param senderId
 * @param receiverId
 * @returns
 */
export const getLastIndividualMessage = async (
  senderId: number,
  receiverId: number
): Promise<[IndividualMessage | null, unknown]> => {
  try {
    const url = `/api/Messages/individual/GetLast/${senderId}/${receiverId}`;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
