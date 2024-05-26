import { protectedAxiosInstance } from "@/utils";
import { FriendRequest } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signalRSendFriendRequest, useSignalREvents } from "@/hooks";

/**
 *
 * @param receiverId
 * @param accessToken
 * @returns
 */
const sendFriendRequest = async (
  receiverId: string
): Promise<FriendRequest | null> => {
  const data = {
    receiverId: receiverId,
    content: "Hello",
  };
  const url = "http://localhost:5001/api/users/friend-request";
  const response = await protectedAxiosInstance.post(url, data);
  return response.data;
};

const useSendFriendRequest = () => {
  const { invokeAction } = useSignalREvents();

  const queryClient = useQueryClient();
  return useMutation<
    FriendRequest | null,
    Error,
    { receiverId: string },
    unknown
  >({
    mutationFn: ({ receiverId }) => sendFriendRequest(receiverId),
    onSuccess: (fr) => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
      if (!fr) {
        return;
      }
      invokeAction(signalRSendFriendRequest(fr));
    },
    onError: (err) => {
      console.error("Failed to send friend request" + err);
    },
  });
};

export { useSendFriendRequest };
