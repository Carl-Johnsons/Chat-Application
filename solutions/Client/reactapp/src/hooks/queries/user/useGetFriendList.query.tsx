import { protectedAxiosInstance } from "@/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";
import { User } from "@/models";

const QUERY_KEY = "friendList";
/**
 * @returns
 */
const getFriendList = async (): Promise<User[] | null> => {
  const url = "http://localhost:5001/api/friend";
  const response = await protectedAxiosInstance.get(url);
  const users: User[] = response.data;
  return users;
};

const useGetFriendList = () => {
  const queryClient = useQueryClient();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: [QUERY_KEY],
    enabled: !!currentUser,
    queryFn: () => getFriendList(),
    initialData: () => {
      return queryClient.getQueryData<User[] | null>([QUERY_KEY]);
    },
  });
};

export { useGetFriendList };
