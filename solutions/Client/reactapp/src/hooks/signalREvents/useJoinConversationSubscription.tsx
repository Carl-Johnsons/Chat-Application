import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useJoinConversationSubscription = () => {
  const queryClient = useQueryClient();

  const subscribeJoinConversationEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.RECEIVE_JOIN_CONVERSATION, () => {
        queryClient.invalidateQueries({
          queryKey: ["conversationList"],
          exact: true,
        });
      });
    },
    [queryClient]
  );

  const unsubscribeJoinConversationEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_JOIN_CONVERSATION);
    },
    []
  );

  return {
    subscribeJoinConversationEvent,
    unsubscribeJoinConversationEvent,
  };
};

export { useJoinConversationSubscription };
