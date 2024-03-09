import { DefaultUser, Friend } from "@/models";
import { axiosInstance } from "@/utils";

/**
 * if you want only friend array, you can use this line
 * data.map(item => item.friendNavigation)
 * @param {number} userId
 * @returns
 */
export const getFriendList = async (
  userId: number
): Promise<Friend[] | null> => {
  const url = "/api/Users/GetFriend/" + userId;
  const response = await axiosInstance.get(url);
  const friendList: Friend[] = response.data;
  friendList.forEach(
    (friend) =>
      (friend.friendNavigation = {
        ...DefaultUser,
        ...friend.friendNavigation,
      })
  );

  return response.data;
};
