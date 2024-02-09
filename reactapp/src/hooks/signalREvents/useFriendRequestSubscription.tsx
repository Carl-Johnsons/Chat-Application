import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";
import { FriendRequest } from "../../models";
import { useGlobalState } from "../../globalState";

const useFriendRequestSubscription = (connection?: HubConnection) => {
  const [friendRequestList, setFriendRequestList] =
    useGlobalState("friendRequestList");
  const [userMap] = useGlobalState("userMap");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("ReceiveFriendRequest", (json: string) => {
      const fr: FriendRequest = JSON.parse(json);
      if (!fr) {
        console.error("Friend request is null");
        return;
      }
      userMap.set(fr.senderId, fr.sender);
      setFriendRequestList([...friendRequestList, fr]);
    });

    return () => {
      connection.off("ReceiveFriendRequest");
    };
  }, [connection, friendRequestList, setFriendRequestList, userMap]);
};

export default useFriendRequestSubscription;
