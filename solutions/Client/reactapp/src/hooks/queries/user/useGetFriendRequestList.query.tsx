import { axiosInstance } from "@/utils";
import { useGetCurrentUser } from ".";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FriendRequestResponseDTO } from "models/DTOs/FriendRequest.response.dto";
import { useLocalStorage } from "hooks/useStorage";

const QUERY_KEY = "friendRequestList";
/**
 * @returns
 */
const getFriendRequestList = async (
  accessToken: string
): Promise<FriendRequestResponseDTO[] | null> => {
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const useGetFriendRequestList = () => {
  const queryClient = useQueryClient();
  const [getAccessToken] = useLocalStorage("access_token");

  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["friendRequestList"],
    enabled: !!currentUser,
    queryFn: () => getFriendRequestList(getAccessToken() as string),
    initialData: () => {
      return queryClient.getQueryData<FriendRequestResponseDTO[] | null>([
        QUERY_KEY,
      ]);
    },
  });
};

export { useGetFriendRequestList };
