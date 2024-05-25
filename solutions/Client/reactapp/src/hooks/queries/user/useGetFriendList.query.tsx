import { protectedAxiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";

const QUERY_KEY = "friendList";
/**
 * @returns
 */
const getFriendList = async (): Promise<string[] | null> => {
  const url = "http://localhost:5001/api/friend";
  const response = await protectedAxiosInstance.get(url);
  const fIdList: string[] = response.data;
  return fIdList;
};

const useGetFriendList = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: [QUERY_KEY],
    enabled: !!currentUser,
    queryFn: () => getFriendList(),
    initialData: () => {
      return queryClient.getQueryData<string[] | null>([QUERY_KEY]);
    },
  });
};

export { useGetFriendList };
