import { protectedAxiosInstance } from "@/utils";
import { useGetCurrentUser } from ".";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FriendRequestResponseDTO } from "models/DTOs/FriendRequest.response.dto";

const QUERY_KEY = "friendRequestList";
/**
 * @returns
 */
const getFriendRequestList = async (): Promise<
  FriendRequestResponseDTO[] | null
> => {
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await protectedAxiosInstance.get(url);
  return response.data;
};

const useGetFriendRequestList = () => {
  const queryClient = useQueryClient();

  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["friendRequestList"],
    enabled: !!currentUser,
    queryFn: () => getFriendRequestList(),
    initialData: () => {
      return queryClient.getQueryData<FriendRequestResponseDTO[] | null>([
        QUERY_KEY,
      ]);
    },
  });
};

export { useGetFriendRequestList };
