import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useFriendRequestSubscription = (connection?: HubConnection) => {
  const queryClient = useQueryClient();
  const subscribeFriendRequestEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.on(SignalREvent.RECEIVE_FRIEND_REQUEST, (_json: string) => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
      });
    });
  }, [connection, queryClient]);

  const unsubscribeFriendRequestEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.on(SignalREvent.RECEIVE_FRIEND_REQUEST, (_json: string) => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
      });
    });
  }, [connection, queryClient]);

  return {
    subscribeFriendRequestEvent,
    unsubscribeFriendRequestEvent,
  };
};

export default useFriendRequestSubscription;
