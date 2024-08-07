import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";
import { AxiosProps, User } from "@/models";
import { useAxios } from "@/hooks";

const QUERY_KEY = "friendList";

interface Props extends AxiosProps {}

const getFriendList = async ({
  axiosInstance,
}: Props): Promise<User[] | null> => {
  const url = "http://localhost:5001/api/friend";
  const response = await axiosInstance.get(url);
  const users: User[] = response.data;
  console.log(users);
  return users;
};

const useGetFriendList = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: [QUERY_KEY],
    enabled: !!currentUser,
    queryFn: () => getFriendList({ axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      return queryClient.getQueryData<User[] | null>([QUERY_KEY]);
    },
  });
};

export { useGetFriendList };
