import { Friend } from "../../models";
import axiosInstance from "../../utils/Api/axios";

/**
 * if you want only friend array, you can use this line
 * data.map(item => item.friendNavigation)
 * @param {number} userId
 * @returns
 */
export const getFriendList = async (
  userId: number
): Promise<[Friend[] | null, unknown]> => {
  try {
    const url = "/api/Users/GetFriend/" + userId;
    const response = await axiosInstance.get(url);

    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
  // Only get friendNavigation then convert it to array
  //resolve(data.map(item => item.friendNavigation));

  //refactor later (Uncomment)
  //ChatApplicationNamespace.LoadFriendData(_FRIEND_LIST);
  //ChatApplicationNamespace.LoadConversationList(_FRIEND_LIST);
};
