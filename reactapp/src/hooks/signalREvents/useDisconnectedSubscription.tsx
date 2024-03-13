import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";

const useDisconnectedSubscription = (connection?: HubConnection) => {

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("Disconnected", (userDisconnectedId: number) => {
      // Fix later
      console.log("signalR Disconnected");
    });
    return () => {
      if (!connection) {
        return;
      }
      connection.off("Disconnected");
    };
  }, [connection]);
};

export default useDisconnectedSubscription;
