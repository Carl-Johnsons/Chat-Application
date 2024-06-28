import { AxiosProps, Message } from "@/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxios } from "@/hooks";
interface Props extends AxiosProps {
  conversationId: string;
  messageContent: string;
}

const sendMessage = async ({
  conversationId,
  messageContent,
  axiosInstance,
}: Props): Promise<Message | null> => {
  const url = "/api/conversation/message";
  const response = await axiosInstance.post(url, {
    conversationId,
    content: messageContent,
  });
  return response.data;
};

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { protectedAxiosInstance } = useAxios();
  const mutation = useMutation<Message | null, Error, Props, unknown>({
    mutationFn: ({ conversationId, messageContent }: Props) =>
      sendMessage({
        conversationId,
        messageContent,
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
