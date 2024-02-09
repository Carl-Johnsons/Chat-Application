import { User, FriendRequest } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 * send friend request using fetch API
 * @param {User} user
 * @param {number} receiverId
 * @returns
 */
export const sendFriendRequest = async (
  user: User,
  receiverId: number
): Promise<[FriendRequest | null, unknown]> => {
  try {
    const data = {
      senderId: user.userId,
      receiverId: receiverId,
      content: "Xin chào! tôi là " + user.name,
    };
    const url = "/api/Users/SendFriendRequest";
    const response = await axiosInstance.post(url, data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
