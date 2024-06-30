import { useAxios } from "@/hooks";
import { AxiosProps, User } from "@/models";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";

const QUERY_KEY = "userblockedList";

interface Props extends AxiosProps {}

const blockUser = async ({ axiosInstance }: Props): Promise<User[] | null> => {
  const url = "http://localhost:5001/api/block";
  const response = await axiosInstance.get(url);
  const users: User[] = response.data;
  return users;
};
const useGetBlockList = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: [QUERY_KEY],
    enabled: !!currentUser,
    queryFn: () => blockUser({ axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      return queryClient.getQueryData<User[] | null>([QUERY_KEY]);
    },
  });
};
export { useGetBlockList };
