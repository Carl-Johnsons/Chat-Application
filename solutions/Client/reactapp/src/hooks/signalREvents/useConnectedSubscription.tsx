import { useEffect } from "react";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useGlobalState } from "..";

const useConnectedSubscription = (connection?: HubConnection) => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.CONNECTED, (userIdsOnlineList: number[]) => {
      if (!connection) {
        return;
      }
      setUserIdsOnlineList(userIdsOnlineList);
      console.log("signalR Connected");
    });
    return () => {
      connection.off(SignalREvent.CONNECTED);
    };
  }, [connection, setUserIdsOnlineList]);
};

export default useConnectedSubscription;
