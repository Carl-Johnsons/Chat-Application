import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { useGlobalState } from "..";
import { SignalREvent } from "data/constants";

const useDisconnectedSubscription = () => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  const subscribeDisconnectedEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.DISCONNECTED, (userDisconnectedId: string) => {
        setUserIdsOnlineList((prev) =>
          prev.filter((userId) => userId !== userDisconnectedId)
        );
        console.log("signalR Disconnected");
      });
    },
    [setUserIdsOnlineList]
  );

  const unsubscribeDisconnectedEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.DISCONNECTED);
    },
    []
  );

  return {
    subscribeDisconnectedEvent,
    unsubscribeDisconnectedEvent,
  };
};

export { useDisconnectedSubscription };
