import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { useGlobalState } from "..";

const useDisconnectedSubscription = (connection?: HubConnection) => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  const subscribeDisconnectedEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.on("Disconnected", (userDisconnectedId: string) => {
      setUserIdsOnlineList((prev) =>
        prev.filter((userId) => userId !== userDisconnectedId)
      );
      console.log("signalR Disconnected");
    });
  }, [connection, setUserIdsOnlineList]);
  
  const unsubscribeDisconnectedEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.off("Disconnected");
  }, [connection]);

  return {
    subscribeDisconnectedEvent,
    unsubscribeDisconnectedEvent,
  };
};

export default useDisconnectedSubscription;
