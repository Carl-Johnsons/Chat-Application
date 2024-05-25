import { Message } from "@/models";
import { protectedAxiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface Props {
  conversationId: string;
  messageContent: string;
}

const sendMessage = async ({
  conversationId,
  messageContent,
}: Props): Promise<Message | null> => {
  const url = "/api/conversation/message";
  const respone = await protectedAxiosInstance.post(url, {
    conversationId,
    content: messageContent,
  });
  return respone.data;
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<Message | null, Error, Props, unknown>({
    mutationFn: ({ conversationId, messageContent }: Props) =>
      sendMessage({ conversationId, messageContent }),
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
