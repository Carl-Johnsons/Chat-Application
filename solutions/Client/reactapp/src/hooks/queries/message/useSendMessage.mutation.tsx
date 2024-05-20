import { signalRSendMessage, useGlobalState, useSignalREvents } from "@/hooks";
import { Message } from "@/models";
import { protectedAxiosInstance } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
interface Props {
  senderId: string;
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
  const [connection] = useGlobalState("connection");
  const invokeAction = useSignalREvents({ connection: connection });
  const queryClient = useQueryClient();

  const mutation = useMutation<Message | null, Error, Props, unknown>({
    mutationFn: ({ senderId, conversationId, messageContent }: Props) =>
      sendMessage({ senderId, conversationId, messageContent }),
    onSuccess: (im, { conversationId }) => {
      if (!im) {
        return;
      }
      invokeAction(signalRSendMessage(im));

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
