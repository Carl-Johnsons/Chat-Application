import { IndividualMessage } from "../../models";
import axiosInstance from "../../Utils/Api/axios";

/**
 *
 * @param senderId
 * @param receiverId
 * @returns
 */
export const getLastIndividualMessageList = async (
  senderId: number,
  receiverId: number
): Promise<[IndividualMessage | null, unknown]> => {
  try {
    const url =
      "/api/Messages/GetLastIndividualMessage/" + senderId + "/" + receiverId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
