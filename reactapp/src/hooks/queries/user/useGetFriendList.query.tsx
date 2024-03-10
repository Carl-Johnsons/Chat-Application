import { DefaultUser, Friend } from "@/models";
import { axiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";

const QUERY_KEY = "friendList";
/**
 * if you want only friend array, you can use this line
 * data.map(item => item.friendNavigation)
 * @param {number} userId
 * @returns
 */
const getFriendList = async (userId: number): Promise<Friend[] | null> => {
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

  return friendList;
};

const useGetFriendList = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: [QUERY_KEY],
    enabled: !!currentUser,
    queryFn: () => getFriendList(currentUser?.userId ?? -1),
    initialData: () => {
      return queryClient.getQueryData<Friend[] | null>([QUERY_KEY]);
    },
  });
};

export { useGetFriendList };
