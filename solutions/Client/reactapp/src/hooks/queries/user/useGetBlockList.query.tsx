import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useGetCurrentUser } from ".";
import { AxiosProps, User } from "@/models";
import { useAxios } from "@/hooks";
import { IDENTITY_SERVER_URL } from "@/constants/url.constant";

const QUERY_KEY = "blockList";

interface Props extends AxiosProps {}

const getBlockUser = async ({
  axiosInstance,
}: Props): Promise<User[] | null> => {
  const url = `${IDENTITY_SERVER_URL}/api/users/block`;
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
    queryFn: () => getBlockUser({ axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      return queryClient.getQueryData<User[] | null>([QUERY_KEY]);
    },
  });
};
export { useGetBlockList };
