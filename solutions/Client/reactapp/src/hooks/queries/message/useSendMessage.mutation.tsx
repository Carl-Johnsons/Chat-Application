import { AxiosProps, Message } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";
interface Props {
  conversationId: string;
  messageContent: string;
  files: Blob[];
}

interface FetchProps extends Props, AxiosProps {}
const sendMessage = async ({
  conversationId,
  messageContent,
  files,
  axiosInstance,
}: FetchProps): Promise<Message | null> => {
  const url = "/api/conversation/message";
  const formData = new FormData();

  formData.append("conversationId", conversationId);
  formData.append("content", messageContent);
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await axiosInstance.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<Message | null, Error, Props, unknown>({
    mutationFn: ({ conversationId, messageContent, files }: Props) =>
      sendMessage({
        conversationId,
        messageContent,
        files,
        axiosInstance: protectedAxiosInstance,
      }),
    onSuccess: (im, { conversationId }) => {
      console.log("success sending message " + im);

      if (!im) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["messageList", "conversation", conversationId, "infinite"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["message", "conversation", conversationId, "last"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to send message: " + err.message);
    },
  });
  return mutation;
};

export { useSendMessage };
