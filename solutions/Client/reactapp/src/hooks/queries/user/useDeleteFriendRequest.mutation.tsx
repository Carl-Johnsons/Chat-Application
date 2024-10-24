import { IDENTITY_SERVER_URL } from "@/constants/url.constant";
import { useAxios } from "@/hooks";
import { AxiosProps } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  const url = `${IDENTITY_SERVER_URL}/api/users/friend-request`;
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
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
      toast.success("Xóa lời mời kết bạn thành công");
    },
    onError: (err) => {
      console.error("Failed to del friend request: " + err.message);
      toast.error("Xóa lời mời kết bạn thành công");
    },
  });
};

export { useDeleteFriendRequest };
