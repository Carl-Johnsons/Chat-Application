import { axiosInstance } from "@/utils";
import { FriendRequest } from "@/models";

/**
 * If you want to get only the sender array, you can use this line of code:
 * data.map(item => item.sender)
 * @param {number} userId
 * @returns
 */
export const getFriendRequestList = async (
  userId: number
): Promise<FriendRequest[] | null> => {
  const url = "/api/Users/GetFriendRequestsByReceiverId/" + userId;
  const response = await axiosInstance.get(url);
  return response.data;
};
