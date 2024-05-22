import { useCallback } from "react";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useGlobalState } from "..";

const useConnectedSubscription = (connection?: HubConnection) => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  const subscribeConnectedEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.CONNECTED, (userIdsOnlineList: string[]) => {
      if (!connection) {
        return;
      }
      setUserIdsOnlineList(userIdsOnlineList);
      console.log("signalR Connected");
    });
  }, [connection, setUserIdsOnlineList]);

  const unsubscribeConnectedEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.off(SignalREvent.CONNECTED);
  }, [connection]);

  return { subscribeConnectedEvent, unsubscribeConnectedEvent };
};

export default useConnectedSubscription;
