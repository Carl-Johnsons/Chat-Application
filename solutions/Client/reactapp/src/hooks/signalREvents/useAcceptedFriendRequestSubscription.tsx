import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { Friend } from "../../models";
import { useQueryClient } from "@tanstack/react-query";

const useAcceptedFriendRequestSubscription = (connection?: HubConnection) => {
  const queryClient = useQueryClient();
  const subscribeAcceptFriendRequestEvent = useCallback(() => {
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
  }, [connection, queryClient]);

  const unsubscribeAcceptFriendRequestEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.off(SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST);
  }, [connection]);

  return {
    subscribeAcceptFriendRequestEvent,
    unsubscribeAcceptFriendRequestEvent,
  };
};

export default useAcceptedFriendRequestSubscription;
