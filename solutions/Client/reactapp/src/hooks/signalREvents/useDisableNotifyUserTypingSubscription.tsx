import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useEffect } from "react";
import { useGlobalState } from "../globalState";

const useDisableNotifyUserTypingSubscription = (connection?: HubConnection) => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.RECEIVE_DISABLE_NOTIFY_USER_TYPING, () => {
      setUserTypingId(null);
    });
    return () => {
      connection.off(SignalREvent.RECEIVE_DISABLE_NOTIFY_USER_TYPING);
    };
  }, [connection, setUserTypingId]);
};

export default useDisableNotifyUserTypingSubscription;
