import { protectedAxiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConversationWithMembersId } from "@/models";

/**
 *
 * @param frId
 * @returns
 */
const acceptFriendRequest = async (
  frId: string
): Promise<ConversationWithMembersId | null> => {
  const data = {
    friendRequestId: frId,
  };
  const url = "http://localhost:5001/api/users/friend-request/accept";
  const response = await protectedAxiosInstance.post(url, data);
  return response.data;
};

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ConversationWithMembersId | null,
    Error,
    {
      frId: string;
    },
    unknown
  >({
    mutationFn: ({ frId }) => {
      return acceptFriendRequest(frId);
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
