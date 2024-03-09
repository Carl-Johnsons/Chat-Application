import { IndividualMessage } from "@/models";
import { axiosInstance } from "@/utils";

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
): Promise<IndividualMessage[] | null> => {
  const url = `/api/Messages/individual/${senderId}/${receiverId}/skip/${skipBatch}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
