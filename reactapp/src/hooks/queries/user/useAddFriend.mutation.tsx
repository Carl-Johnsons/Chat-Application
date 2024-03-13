import { axiosInstance } from "@/utils";
import { useGetCurrentUser, useGetUser } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signalRSendAcceptFriendRequest,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";
import { Friend } from "@/models";
import { useState } from "react";

/**
 * Add a friend using fetch API
 * - Sender is the one who send the friend request
 * - Receiver is the one who accept the friend request
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
const addFriend = async (
  senderId: number,
  receiverId: number
): Promise<boolean | null> => {
  // Sender is the one who send the request not the current user
  // The current user is the one who accept the friend request
  const url = "/api/Users/AddFriend/" + senderId + "/" + receiverId;
  const response = await axiosInstance.post(url);
  return response.status === 201;
};

const useAddFriend = () => {
  const [connection] = useGlobalState("connection");
  const [senderId, setsenderId] = useState(-1);

  const { data: currentUser } = useGetCurrentUser();
  const { data: sender } = useGetUser(senderId);
  const queryClient = useQueryClient();
  const invokeAction = useSignalREvents({ connection: connection });
  return useMutation<
    boolean | null,
    Error,
    {
      senderId: number;
    },
    unknown
  >({
    mutationFn: ({ senderId }) => {
      setsenderId(senderId);
      return addFriend(senderId, currentUser?.userId ?? -1);
    },
    onSuccess: (_, { senderId }) => {
      if (!sender) {
        return;
      }
      // Invert the property to send to other user
      const friend: Friend = {
        userId: currentUser?.userId ?? -1,
        friendId: senderId,
        friendNavigation: sender,
      };

      invokeAction(signalRSendAcceptFriendRequest(friend));
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

export { useAddFriend };
