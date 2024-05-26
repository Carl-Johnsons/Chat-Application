import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useFriendRequestSubscription = () => {
  const queryClient = useQueryClient();
  const subscribeFriendRequestEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      connection.on(SignalREvent.RECEIVE_FRIEND_REQUEST, () => {
        queryClient.invalidateQueries({
          queryKey: ["friendRequestList"],
        });
      });
    },
    [queryClient]
  );

  const unsubscribeFriendRequestEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      connection.on(SignalREvent.RECEIVE_FRIEND_REQUEST, (_json: string) => {
        queryClient.invalidateQueries({
          queryKey: ["friendRequestList"],
        });
      });
    },
    [queryClient]
  );

  return {
    subscribeFriendRequestEvent,
    unsubscribeFriendRequestEvent,
  };
};

export default useFriendRequestSubscription;
