import {
  signalRSendGroupMessage,
  signalRSendIndividualMessage,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";
import { GroupMessage, IndividualMessage, MessageType } from "@/models";
import { axiosInstance, getCurrentDateTimeInISO8601 } from "@/utils";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
interface Props {
  senderId: number;
  receiverId: number;
  messageContent: string;
}

const sendGroupMessage = async ({
  senderId,
  receiverId,
  messageContent,
}: Props): Promise<GroupMessage | null> => {
  //group message object
  const messageObject: GroupMessage = {
    groupReceiverId: receiverId,
    message: {
      senderId: senderId,
      content: messageContent,
      time: getCurrentDateTimeInISO8601(),
      messageType: "Group",
      messageFormat: "Text",
      active: true,
    },
  };

  const url = "/api/Messages/group";
  const respone = await axiosInstance.post(url, messageObject);
  return respone.data;
};

/**
 * The sender is the current User while the receiver is the other user
 * The messageContent is a string
 */
const sendIndividualMessage = async ({
  senderId,
  receiverId,
  messageContent,
}: Props): Promise<IndividualMessage | null> => {
  //individual message object
  const messageObject: IndividualMessage = {
    messageId: 0,
    userReceiverId: receiverId,
    userReceiver: null,
    status: "string",
    message: {
      messageId: 0,
      sender: null,
      senderId: senderId,
      content: messageContent,
      time: getCurrentDateTimeInISO8601(),
      messageType: "Individual",
      messageFormat: "Text",
      active: true,
    },
  };
  const url = "/api/Messages/individual";
  const respone = await axiosInstance.post(url, messageObject);
  return respone.data;
};

const useSendMessage = (type: MessageType) => {
  const [connection] = useGlobalState("connection");
  const invokeAction = useSignalREvents({ connection: connection });
  const queryClient = useQueryClient();

  const individualMutation = useMutation<
    IndividualMessage | null,
    Error,
    Props,
    unknown
  >({
    mutationFn: ({ senderId, receiverId, messageContent }: Props) =>
      sendIndividualMessage({ senderId, receiverId, messageContent }),
    onSuccess: (im, { receiverId }) => {
      if (!im) {
        return;
      }
      invokeAction(signalRSendIndividualMessage(im));

      queryClient.invalidateQueries({
        queryKey: ["messageList", type.toLowerCase(), receiverId],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["lastMessageList"],
        exact: true,
      });
    },
    onError: (err) => {
      console.error("Failed to send individual message: " + err.message);
    },
  });

  const groupMutation = useMutation<GroupMessage | null, Error, Props, unknown>(
    {
      mutationFn: ({ senderId, receiverId, messageContent }: Props) =>
        sendGroupMessage({ senderId, receiverId, messageContent }),
      onSuccess: (gm, { receiverId }) => {
        if (!gm) {
          return;
        }
        invokeAction(signalRSendGroupMessage(gm));

        queryClient.invalidateQueries({
          queryKey: ["messageList", type.toLowerCase(), receiverId],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["lastMessageList"],
          exact: true,
        });
      },
      onError: (err) => {
        console.error("Failed to send group message: " + err.message);
      },
    }
  );
  switch (type) {
    case "Individual":
      return individualMutation;
    default:
      return groupMutation;
  }
};

const useSendGroupMessage = () =>
  useSendMessage("Group") as UseMutationResult<
    GroupMessage | null,
    Error,
    Props,
    unknown
  >;
const useSendIndividualMessage = () =>
  useSendMessage("Individual") as UseMutationResult<
    IndividualMessage | null,
    Error,
    Props,
    unknown
  >;

export { useSendGroupMessage, useSendIndividualMessage };
