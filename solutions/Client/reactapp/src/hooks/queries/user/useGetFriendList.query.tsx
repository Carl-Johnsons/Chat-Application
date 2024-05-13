import { axiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";
import { useLocalStorage } from "hooks/useStorage";

const QUERY_KEY = "friendList";
/**
 * @returns
 */
const getFriendList = async (accessToken: string): Promise<string[] | null> => {
  const url = "http://localhost:5001/api/friend";
  const response = await axiosInstance.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const fIdList: string[] = response.data;
  return fIdList;
};

const useGetFriendList = () => {
  const [getAccessToken] = useLocalStorage("access_token");
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: [QUERY_KEY],
    enabled: !!currentUser,
    queryFn: () => getFriendList(getAccessToken() as string),
    initialData: () => {
      return queryClient.getQueryData<string[] | null>([QUERY_KEY]);
    },
  });
};

export { useGetFriendList };
