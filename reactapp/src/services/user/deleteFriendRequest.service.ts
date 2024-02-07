import axiosInstance from "../../Utils/Api/axios";

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
