import { axiosInstance } from "@/utils";

export const deleteFriend = async (
  userId: number,
  friendId: number
): Promise<boolean | null> => {
  const url = "/api/Users/RemoveFriend/" + userId + "/" + friendId;
  const response = await axiosInstance.delete(url);
  return response.status === 204;
};
