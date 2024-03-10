import { axiosInstance } from "@/utils";
import { User, FriendRequest } from "@/models";
import { useGetCurrentUser } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signalRSendFriendRequest,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";

/**
 * @param {User} user
 * @param {number} receiverId
 * @returns
 */
const sendFriendRequest = async (
  user: User | null | undefined,
  receiverId: number
): Promise<FriendRequest | null> => {
  if (!user) {
    return null;
  }
  const data = {
    senderId: user.userId,
    receiverId: receiverId,
    content: "Xin chào! tôi là " + user.name,
  };
  const url = "/api/Users/SendFriendRequest";
  const response = await axiosInstance.post(url, data);
  return response.data;
};

const useSendFriendRequest = () => {
  const [connection] = useGlobalState("connection");
  const invokeAction = useSignalREvents({ connection: connection });

  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  return useMutation<
    FriendRequest | null,
    Error,
    { receiverId: number },
    unknown
  >({
    mutationFn: ({ receiverId }) => sendFriendRequest(currentUser, receiverId),
    onSuccess: (fr) => {
      if (!fr) {
        return;
      }
      invokeAction(signalRSendFriendRequest(fr));

      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to send friend request" + err);
    },
  });
};

export { useSendFriendRequest };
