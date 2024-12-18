import { AxiosProps } from "@/models";
import { useGetCurrentUser } from ".";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FriendRequestResponseDTO } from "models/DTOs/FriendRequest.response.dto";
import { useAxios } from "@/hooks";
import { IDENTITY_SERVER_URL } from "@/constants/url.constant";

const QUERY_KEY = "friendRequestList";

interface Props extends AxiosProps {}
const getFriendRequestList = async ({
  axiosInstance,
}: Props): Promise<FriendRequestResponseDTO[] | null> => {
  const url = `${IDENTITY_SERVER_URL}/api/users/friend-request`;
  const response = await axiosInstance.get(url);
  return response.data;
};

const useGetFriendRequestList = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const { data: currentUser } = useGetCurrentUser();
  return useQuery({
    queryKey: ["friendRequestList"],
    enabled: !!currentUser,
    queryFn: () =>
      getFriendRequestList({ axiosInstance: protectedAxiosInstance }),
    initialData: () => {
      return queryClient.getQueryData<FriendRequestResponseDTO[] | null>([
        QUERY_KEY,
      ]);
    },
  });
};

export { useGetFriendRequestList };
