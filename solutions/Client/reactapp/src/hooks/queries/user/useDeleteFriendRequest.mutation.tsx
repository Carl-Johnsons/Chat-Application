import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props extends AxiosProps {
  friendRequestId: string;
}

export const deleteFriendRequest = async ({
  friendRequestId,
  axiosInstance,
}: Props): Promise<boolean | null> => {
  const data = {
    friendRequestId,
  };
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await axiosInstance.delete(url, {
    data,
  });
  return response.status === 204;
};

const useDeleteFriendRequest = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    boolean | null,
    Error,
    {
      frId: string;
    },
    unknown
  >({
    mutationFn: ({ frId }) =>
      deleteFriendRequest({
        friendRequestId: frId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
      console.log("del friend request successfully");
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to del friend request: " + err.message);
    },
  });
};

export { useDeleteFriendRequest };
