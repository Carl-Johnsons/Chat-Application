import { axiosInstance } from "@/utils";
import { useGetCurrentUser, useGetUser } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signalRJoinConversation,
  signalRSendAcceptFriendRequest,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";
import { ConversationWithMembersId, Friend } from "@/models";
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
): Promise<ConversationWithMembersId | null> => {
  // Sender is the one who send the request not the current user
  // The current user is the one who accept the friend request
  const url = "/api/Users/AddFriend/" + senderId + "/" + receiverId;
  const response = await axiosInstance.post(url);
  return response.data;
};

const useAddFriend = () => {
  const [connection] = useGlobalState("connection");
  const [senderId, setsenderId] = useState(-1);

  const { data: currentUser } = useGetCurrentUser();
  const { data: sender } = useGetUser(senderId);
  const queryClient = useQueryClient();
  const invokeAction = useSignalREvents({ connection: connection });
  return useMutation<
    ConversationWithMembersId | null,
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
    onSuccess: (conversation, { senderId }) => {
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
      conversation?.membersId.forEach((memberId) => {
        invokeAction(signalRJoinConversation(memberId, conversation.id));
      });

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

export { useAddFriend };
