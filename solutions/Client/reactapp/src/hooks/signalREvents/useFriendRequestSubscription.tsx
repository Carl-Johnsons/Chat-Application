import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useFriendRequestSubscription = (connection?: HubConnection) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!connection) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.on(SignalREvent.RECEIVE_FRIEND_REQUEST, (_json: string) => {
      queryClient.invalidateQueries({
        queryKey: ["friendRequestList"],
      });
    });

    return () => {
      connection.off(SignalREvent.RECEIVE_FRIEND_REQUEST);
    };
  }, [connection, queryClient]);
};

export default useFriendRequestSubscription;
