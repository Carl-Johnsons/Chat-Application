import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosProps, ConversationWithMembersId } from "@/models";
import { useAxios } from "@/hooks";
import { toast } from "react-toastify";
import { IDENTITY_SERVER_URL } from "@/constants/url.constant";

interface Props extends AxiosProps {
  friendId: string;
}

const acceptFriendRequest = async ({
  friendId,
  axiosInstance,
}: Props): Promise<ConversationWithMembersId | null> => {
  const data = {
    friendRequestId: friendId,
  };
  const url = `${IDENTITY_SERVER_URL}/api/users/friend-request/accept`;
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    ConversationWithMembersId | null,
    Error,
    {
      frId: string;
    },
    unknown
  >({
    mutationFn: ({ frId }) => {
      return acceptFriendRequest({
        friendId: frId,
        axiosInstance: protectedAxiosInstance,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["friendList"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
      toast.success("Chấp nhận lời mời kết bạn thành công");
    },
    onError: (err) => {
      console.error("Add friend failed: " + err.message);
      toast.error("Chấp nhận lời mời kết bạn thất bại");
    },
  });
};

export { useAcceptFriendRequest };
