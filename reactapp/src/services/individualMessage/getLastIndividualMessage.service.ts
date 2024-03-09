import { IndividualMessage } from "@/models";
import { axiosInstance } from "@/utils";

/**
 *
 * @param senderId
 * @param receiverId
 * @returns
 */
export const getLastIndividualMessage = async (
  senderId: number,
  receiverId: number
): Promise<IndividualMessage | null> => {
  const url = `/api/Messages/individual/GetLast/${senderId}/${receiverId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
