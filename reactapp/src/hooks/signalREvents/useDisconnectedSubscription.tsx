import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";
import { useGlobalState } from "../globalState";

const useDisconnectedSubscription = (connection?: HubConnection) => {
  const [userMap, setUserMap] = useGlobalState("userMap");

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("Disconnected", (userDisconnectedId: number) => {
      let isChanged = false;
      const newUserMap = new Map(userMap);
      const user = newUserMap.get(userDisconnectedId);
      if (user) {
        isChanged = true;
        user.isOnline = false;
      }
      if (isChanged) {
        setUserMap(newUserMap);
      }
      console.log("signalR Disconnected");
    });
    return () => {
      if (!connection) {
        return;
      }
      connection.off("Disconnected");
    };
  }, [connection, setUserMap, userMap]);
};

export default useDisconnectedSubscription;
