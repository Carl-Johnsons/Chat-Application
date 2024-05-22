import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useJoinConversationSubscription = (connection?: HubConnection) => {
  const queryClient = useQueryClient();

  const subscribeJoinConversationEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (_conversationId: number) => {
        queryClient.invalidateQueries({
          queryKey: ["conversationList"],
          exact: true,
        });
      }
    );
  }, [connection, queryClient]);

  const unsubscribeJoinConversationEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.off(SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST);
  }, [connection]);

  return {
    subscribeJoinConversationEvent,
    unsubscribeJoinConversationEvent,
  };
};

export default useJoinConversationSubscription;
