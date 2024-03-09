import { IndividualMessage } from "@/models";
import { axiosInstance } from "@/utils";

/**
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
export const getIndividualMessageList = async (
  senderId: number,
  receiverId: number
): Promise<IndividualMessage[] | null> => {
  const url = `/api/Messages/individual/${senderId}/${receiverId}`;
  const response = await axiosInstance.get(url);
  return response.data;
};
