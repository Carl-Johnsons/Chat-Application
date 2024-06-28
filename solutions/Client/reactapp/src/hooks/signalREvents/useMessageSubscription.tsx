import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../globalState";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Message } from "@/models";

const useMessageSubscription = () => {
  const [activeConversationId] = useGlobalState("activeConversationId");
  const queryClient = useQueryClient();
  const activeConversationIdRef = useRef(activeConversationId);

  // Update ref whenever activeConversationId changes
  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  const subscribeMessageEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      connection.on(SignalREvent.RECEIVE_MESSAGE, (message: Message) => {
        if (message.conversationId === activeConversationIdRef.current) {
          console.log("invalidate messageList");
          queryClient.invalidateQueries({
            queryKey: [
              "messageList",
              "conversation",
              activeConversationIdRef.current,
              "infinite",
            ],
            exact: true,
          });
        }

        queryClient.invalidateQueries({
          queryKey: ["message", "conversation", message.conversationId, "last"],
          exact: true,
        });
      });
    },
    [queryClient]
  );

  const unsubscribeMessageEvent = useCallback((connection: HubConnection) => {
    if (!connection) {
      return;
    }
    connection.off(SignalREvent.RECEIVE_MESSAGE);
  }, []);

  return {
    subscribeMessageEvent,
    unsubscribeMessageEvent,
  };
};

export { useMessageSubscription };
