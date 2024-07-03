import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Conversation,
  ConversationWithMembersId,
  GroupConversationWithMembersId,
} from "@/models";
import { GroupConversationWithMembersIdDTO } from "@/models/DTOs";
import { AxiosProps } from "models/AxiosProps.model";
import { useAxios } from "@/hooks";
import { toast } from "react-toastify";

interface Props {
  otherUserId: string;
}
interface FetchProps extends Props, AxiosProps {}

interface GroupProps {
  conversationWithMembersId:
    | ConversationWithMembersId
    | GroupConversationWithMembersIdDTO
    | undefined;
}

interface FetchGroupProps extends GroupProps, AxiosProps {}

const createConversation = async ({
  otherUserId,
  axiosInstance,
}: FetchProps): Promise<Conversation | null> => {
  const url = `/api/conversation`;
  const data = {
    otherUserId,
  };
  const response = await axiosInstance.post(url, data);
  return response.data;
};
const createGroupConversation = async ({
  conversationWithMembersId,
  axiosInstance,
}: FetchGroupProps): Promise<GroupConversationWithMembersId | null> => {
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

  return useMutation<Conversation | null, Error, Props, unknown>({
    mutationFn: async ({ otherUserId }) =>
      createConversation({
        otherUserId,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
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
    GroupProps,
    unknown
  >({
    mutationFn: ({ conversationWithMembersId }) =>
      toast.promise(
        createGroupConversation({
          conversationWithMembersId,
          axiosInstance: protectedAxiosInstance,
        }),
        {
          pending: "Đang tạo nhóm",
          success: "Tạo nhóm thành công",
          error: "Tạo nhóm thất bại",
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error(err.message);
    },
  });
};
export { useCreateConversation, useCreateGroupConversation };
