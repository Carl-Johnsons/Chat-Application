import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";
import { FriendRequest } from "../../models";
import { useGlobalState } from "../globalState";
import { SignalREvent } from "../../data/constants";

const useFriendRequestSubscription = (connection?: HubConnection) => {
  const [friendRequestList, setFriendRequestList] =
    useGlobalState("friendRequestList");
  const [userMap] = useGlobalState("userMap");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.RECEIVE_FRIEND_REQUEST, (json: string) => {
      const fr: FriendRequest = JSON.parse(json);
      if (!fr) {
        console.error("Friend request is null");
        return;
      }
      userMap.set(fr.senderId, fr.sender);
      setFriendRequestList([...friendRequestList, fr]);
    });

    return () => {
      connection.off(SignalREvent.RECEIVE_FRIEND_REQUEST);
    };
  }, [connection, friendRequestList, setFriendRequestList, userMap]);
};

export default useFriendRequestSubscription;
