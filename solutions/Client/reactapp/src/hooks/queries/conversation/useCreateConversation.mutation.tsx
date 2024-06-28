import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ConversationWithMembersId,
  GroupConversationWithMembersId,
} from "@/models";
import { GroupConversationWithMembersIdDTO } from "@/models/DTOs";
import { AxiosProps } from "models/AxiosProps.model";
import { useAxios } from "@/hooks";

interface Props extends AxiosProps {
  conversationWithMembersId:
    | ConversationWithMembersId
    | GroupConversationWithMembersIdDTO
    | undefined;
}
const createConversation = async ({
  conversationWithMembersId,
  axiosInstance,
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
  axiosInstance,
}: Props): Promise<GroupConversationWithMembersId | null> => {
  if (!conversationWithMembersId) {
    return null;
  }
  const url = `/api/conversation/group`;
  const response = await axiosInstance.post(url, conversationWithMembersId);
  return response.data;
};
const useCreateConversation = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();

  return useMutation<ConversationWithMembersId | null, Error, Props, unknown>({
    mutationFn: ({ conversationWithMembersId }) =>
      createConversation({
        conversationWithMembersId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
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
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  return useMutation<
    GroupConversationWithMembersId | null,
    Error,
    Props,
    unknown
  >({
    mutationFn: ({ conversationWithMembersId }) =>
      createGroupConversation({
        conversationWithMembersId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
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
