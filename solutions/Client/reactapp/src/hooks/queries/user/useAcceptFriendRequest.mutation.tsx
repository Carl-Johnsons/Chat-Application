import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosProps, ConversationWithMembersId } from "@/models";
import { useAxios } from "@/hooks";

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
  const url = "http://localhost:5001/api/users/friend-request/accept";
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
        queryKey: ["conversationList"],
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
    },
    onError: (err) => {
      console.error("Add friend failed: " + err.message);
    },
  });
};

export { useAcceptFriendRequest };
