import axiosInstance from "../../utils/Api/axios";

export const deleteFriend = async (
  userId: number,
  friendId: number
): Promise<[number | null, unknown]> => {
  try {
    const url = "/api/Users/RemoveFriend/" + userId + "/" + friendId;
    const response = await axiosInstance.delete(url);
    return [response.status, null];
  } catch (error) {
    return [null, error];
  }
};
