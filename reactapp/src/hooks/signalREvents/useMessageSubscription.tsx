import { useEffect } from "react";
import { useGlobalState } from "../globalState";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/models";

const useMessageSubscription = (connection?: HubConnection) => {
  const [activeConversationId] = useGlobalState("activeConversationId");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!connection) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.on(SignalREvent.RECEIVE_MESSAGE, (message: Message) => {
      queryClient.invalidateQueries({
        queryKey: [
          "messageList",
          "conversation",
          activeConversationId,
          "infinite",
        ],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["message", "conversation", message.conversationId, "last"],
        exact: true,
      });
    });
    return () => {
      connection.off(SignalREvent.RECEIVE_MESSAGE);
    };
  }, [activeConversationId, connection, queryClient]);
};

export default useMessageSubscription;
