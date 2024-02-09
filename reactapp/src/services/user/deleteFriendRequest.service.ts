import axiosInstance from "../../utils/Api/axios";
/**
 * - Sender is the who send the friend request
 * - Recevier is the who accept the friend request (current user)
 * @param senderId
 * @param receiverId
 * @returns
 */
export const deleteFriendRequest = async (
  senderId: number,
  receiverId: number
): Promise<[number | null, unknown]> => {
  try {
    const url = "/api/Users/RemoveFriendRequest/" + senderId + "/" + receiverId;
    const response = await axiosInstance.delete(url);
    return [response.status, null];
  } catch (error) {
    return [null, error];
  }
};
