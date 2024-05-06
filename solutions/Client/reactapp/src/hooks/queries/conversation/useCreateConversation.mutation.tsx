import { axiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ConversationWithMembersId,
  GroupConversationWithMembersId,
} from "@/models";
import {
  signalRJoinConversation,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";
import { GroupConversationWithMembersIdDTO } from "@/models/DTOs";

interface Props {
  conversationWithMembersId:
    | ConversationWithMembersId
    | GroupConversationWithMembersIdDTO
    | undefined;
}
const createConversation = async ({
  conversationWithMembersId,
}: Props): Promise<ConversationWithMembersId | null> => {
  if (!conversationWithMembersId) {
    return null;
  }
  const url = `/api/Conversation`;
  const response = await axiosInstance.post(url, conversationWithMembersId);
  return response.data;
};
const createGroupConversation = async ({
  conversationWithMembersId,
}: Props): Promise<GroupConversationWithMembersId | null> => {
  if (!conversationWithMembersId) {
    return null;
  }
  const url = `/api/Conversation/Group`;
  const response = await axiosInstance.post(url, conversationWithMembersId);
  return response.data;
};
const useCreateConversation = () => {
  const [connection] = useGlobalState("connection");
  const invokeAction = useSignalREvents({ connection: connection });

  const queryClient = useQueryClient();
  return useMutation<ConversationWithMembersId | null, Error, Props, unknown>({
    mutationFn: ({ conversationWithMembersId }) =>
      createConversation({ conversationWithMembersId }),
    onSuccess: (conversation) => {
      conversation?.membersId.forEach((memberId) => {
        invokeAction(signalRJoinConversation(memberId, conversation.id));
      });

      queryClient.invalidateQueries({
        queryKey: ["conversationList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
};
const useCreateGroupConversation = () => {
  const [connection] = useGlobalState("connection");
  const invokeAction = useSignalREvents({ connection: connection });

  const queryClient = useQueryClient();
  return useMutation<
    GroupConversationWithMembersId | null,
    Error,
    Props,
    unknown
  >({
    mutationFn: ({ conversationWithMembersId }) =>
      createGroupConversation({ conversationWithMembersId }),
    onSuccess: (conversation) => {
      conversation?.membersId.forEach((memberId) => {
        invokeAction(signalRJoinConversation(memberId, conversation.id));
      });
      queryClient.invalidateQueries({
        queryKey: ["conversationList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
};
export { useCreateConversation, useCreateGroupConversation };
