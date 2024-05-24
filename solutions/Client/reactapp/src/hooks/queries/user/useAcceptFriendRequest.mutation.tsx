import { protectedAxiosInstance } from "@/utils";
import { useGetCurrentUser } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signalRJoinConversation,
  signalRSendAcceptFriendRequest,
  useSignalREvents,
} from "@/hooks";
import { ConversationWithMembersId, Friend } from "@/models";
import { useState } from "react";

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
  const [senderId, setSenderId] = useState("");

  const { data: currentUser } = useGetCurrentUser();
  const queryClient = useQueryClient();
  const { invokeAction } = useSignalREvents();
  return useMutation<
    ConversationWithMembersId | null,
    Error,
    {
      frId: string;
    },
    unknown
  >({
    mutationFn: ({ frId }) => {
      setSenderId(frId);
      return acceptFriendRequest(frId);
    },
    onSuccess: (conversation) => {
      // Invert the property to send to other user
      const friend: Friend = {
        userId: currentUser?.id ?? "",
        friendId: senderId,
      };

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

      invokeAction(signalRSendAcceptFriendRequest(friend));
      conversation?.membersId.forEach((memberId) => {
        invokeAction(signalRJoinConversation(memberId, conversation.id));
      });

    },
    onError: (err) => {
      console.error("Add friend failed: " + err.message);
    },
  });
};

export { useAcceptFriendRequest };
