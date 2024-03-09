import { GroupMessage, IndividualMessage } from "@/models";
import { axiosInstance } from "@/utils";
import { AxiosResponse } from "axios";

/**
 * @param {number} userId
 * @returns
 */
export const getLastMessageList = async (
  userId: number
): Promise<IndividualMessage[] | GroupMessage[] | null> => {
  const url = `/api/Messages/GetLast/${userId}`;
  const response: AxiosResponse<IndividualMessage[] | GroupMessage[]> =
    await axiosInstance.get(url);
  return response.data;
};
