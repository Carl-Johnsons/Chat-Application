import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { useGlobalState } from "..";

const useDisconnectedSubscription = () => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  const subscribeDisconnectedEvent = useCallback((connection: HubConnection) => {
    if (!connection) {
      return;
    }
    connection.on("Disconnected", (userDisconnectedId: string) => {
      setUserIdsOnlineList((prev) =>
        prev.filter((userId) => userId !== userDisconnectedId)
      );
      console.log("signalR Disconnected");
    });
  }, [setUserIdsOnlineList]);
  
  const unsubscribeDisconnectedEvent = useCallback((connection: HubConnection) => {
    if (!connection) {
      return;
    }
    connection.off("Disconnected");
  }, []);

  return {
    subscribeDisconnectedEvent,
    unsubscribeDisconnectedEvent,
  };
};

export default useDisconnectedSubscription;
