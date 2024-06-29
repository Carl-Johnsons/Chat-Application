import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ConversationWithMembersId,
  GroupConversationWithMembersId,
} from "@/models";
import { GroupConversationWithMembersIdDTO } from "@/models/DTOs";
import { AxiosProps } from "models/AxiosProps.model";
import { useAxios } from "@/hooks";

interface Props {
  conversationWithMembersId:
    | ConversationWithMembersId
    | GroupConversationWithMembersIdDTO
    | undefined;
}

interface FetchProps extends Props, AxiosProps {}

const createConversation = async ({
  conversationWithMembersId,
  axiosInstance,
}: FetchProps): Promise<ConversationWithMembersId | null> => {
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
}: FetchProps): Promise<GroupConversationWithMembersId | null> => {
  if (!conversationWithMembersId) {
    return null;
  }
  const url = `/api/conversation/group`;
  const formData = new FormData();
  // Cast object to a more flexible type
  const conversationAsAny = conversationWithMembersId as { [key: string]: any };

  for (const key in conversationAsAny) {
    if (conversationAsAny.hasOwnProperty(key)) {
      if (Array.isArray(conversationAsAny[key])) {
        // If the property is an array, append each element separately
        conversationAsAny[key].forEach((item: string) => {
          formData.append(`${key}`, item);
        });
      } else {
        formData.append(key, conversationAsAny[key]);
      }
    }
  }
  
  const response = await axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
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
