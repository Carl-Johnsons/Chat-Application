import { useEffect } from "react";
import { useGlobalState } from "../../globalState";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";

const useConnectedSubscription = (connection?: HubConnection) => {
  const [userMap, setUserMap] = useGlobalState("userMap");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.CONNECTED, (userIdOnlineList: number[]) => {
      if (!connection) {
        return;
      }
      let isChanged = false;
      const newUserMap = new Map([...userMap]);
      userIdOnlineList.forEach((userId) => {
        const user = newUserMap.get(userId);
        if (user) {
          isChanged = true;
          newUserMap.set(userId, { ...user, isOnline: true });
        }
      });
      if (isChanged) {
        setUserMap(newUserMap);
      }
      console.log("signalR Connected");
    });
    return () => {
      connection.off(SignalREvent.CONNECTED);
    };
  }, [connection, setUserMap, userMap]);
};

export default useConnectedSubscription;
