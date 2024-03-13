import { useEffect } from "react";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";

const useConnectedSubscription = (connection?: HubConnection) => {
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.CONNECTED, (userIdOnlineList: number[]) => {
      if (!connection) {
        return;
      }
      // Add later
      console.log("signalR Connected");
    });
    return () => {
      connection.off(SignalREvent.CONNECTED);
    };
  }, [connection]);
};

export default useConnectedSubscription;
