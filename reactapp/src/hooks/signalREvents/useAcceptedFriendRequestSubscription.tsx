import { HubConnection } from "@microsoft/signalr";
import { useEffect } from "react";
import { SignalREvent } from "../../data/constants";
import { Friend } from "../../models";
import { useGlobalState } from "../../globalState";

const useAcceptedFriendRequestSubscription = (connection?: HubConnection) => {
  const [friendList, setFriendList] = useGlobalState("friendList");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST,
      (friend: Friend) => {
        setFriendList([...friendList, friend]);
      }
    );
    return () => {
      connection.off(SignalREvent.RECEIVE_ACCEPT_FRIEND_REQUEST);
    };
  }, [connection, friendList, setFriendList]);
};

export default useAcceptedFriendRequestSubscription;
