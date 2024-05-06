import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";
import { useGlobalState } from "..";

const useDisconnectedSubscription = (connection?: HubConnection) => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("Disconnected", (userDisconnectedId: number) => {
      setUserIdsOnlineList((prev) =>
        prev.filter((userId) => userId !== userDisconnectedId)
      );
      console.log("signalR Disconnected");
    });
    return () => {
      if (!connection) {
        return;
      }
      connection.off("Disconnected");
    };
  }, [connection, setUserIdsOnlineList]);
};

export default useDisconnectedSubscription;
