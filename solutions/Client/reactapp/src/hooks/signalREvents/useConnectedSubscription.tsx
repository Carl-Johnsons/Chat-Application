import { useCallback } from "react";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useGlobalState } from "..";

const useConnectedSubscription = () => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  const subscribeConnectedEvent = useCallback(
    (connection?: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.CONNECTED, (userIdsOnlineList: string[]) => {
        if (!connection) {
          return;
        }
        setUserIdsOnlineList(userIdsOnlineList);
      });
    },
    [setUserIdsOnlineList]
  );

  const unsubscribeConnectedEvent = useCallback(
    (connection?: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.CONNECTED);
    },
    []
  );

  return { subscribeConnectedEvent, unsubscribeConnectedEvent };
};

export default useConnectedSubscription;
