import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { Friend } from "../../models";
import { useQueryClient } from "@tanstack/react-query";

const useAcceptedFriendRequestSubscription = () => {
  const queryClient = useQueryClient();
  const subscribeAcceptFriendRequestEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(
        SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_friend: Friend) => {
          console.log("receive accept friend request");

          queryClient.invalidateQueries({
            queryKey: ["friendList"],
            exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: ["friendRequestList"],
            exact: true,
          });
        }
      );
    },
    [queryClient]
  );

  const unsubscribeAcceptFriendRequestEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST);
    },
    []
  );

  return {
    subscribeAcceptFriendRequestEvent,
    unsubscribeAcceptFriendRequestEvent,
  };
};

export default useAcceptedFriendRequestSubscription;
