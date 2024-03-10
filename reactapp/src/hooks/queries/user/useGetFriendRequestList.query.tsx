import { axiosInstance } from "@/utils";
import { FriendRequest } from "@/models";
import { useGetCurrentUser } from ".";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "friendRequestList";
/**
 * If you want to get only the sender array, you can use this line of code:
 * data.map(item => item.sender)
 * @param {number} userId
 * @returns
 */
const getFriendRequestList = async (
  userId: number
): Promise<FriendRequest[] | null> => {
  const url = "/api/Users/GetFriendRequestsByReceiverId/" + userId;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetFriendRequestList = () => {
  const queryClient = useQueryClient();

  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["friendRequestList"],
    enabled: !!currentUser,
    queryFn: () => getFriendRequestList(currentUser?.userId ?? -1),
    initialData: () => {
      return queryClient.getQueryData<FriendRequest[] | null>([QUERY_KEY]);
    },
  });
};

export { useGetFriendRequestList };
