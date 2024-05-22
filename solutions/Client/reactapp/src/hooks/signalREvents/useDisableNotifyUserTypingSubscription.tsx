import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback } from "react";
import { useGlobalState } from "../globalState";

const useDisableNotifyUserTypingSubscription = (connection?: HubConnection) => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  const subscribeDisableNotifyUserTypingEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.RECEIVE_DISABLE_NOTIFY_USER_TYPING, () => {
      setUserTypingId(null);
    });
  }, [connection, setUserTypingId]);
  const unsubscribeDisableNotifyUserTypingEvent = useCallback(() => {
    if (!connection) {
      return;
    }
    connection.off(SignalREvent.RECEIVE_DISABLE_NOTIFY_USER_TYPING);
  }, [connection]);

  return {
    subscribeDisableNotifyUserTypingEvent,
    unsubscribeDisableNotifyUserTypingEvent,
  };
};

export default useDisableNotifyUserTypingSubscription;
