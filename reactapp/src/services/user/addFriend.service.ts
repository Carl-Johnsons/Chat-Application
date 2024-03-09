import { axiosInstance } from "@/utils";

/**
 * Add a friend using fetch API
 * - Sender is the one who send the friend request
 * - Receiver is the one who accept the friend request
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
export const addFriend = async (
  senderId: number,
  receiverId: number
): Promise<boolean | null> => {
  // Sender is the one who send the request not the current user
  // The current user is the one who accept the friend request
  const url = "/api/Users/AddFriend/" + senderId + "/" + receiverId;
  const response = await axiosInstance.post(url);
  return response.status === 201;
};
