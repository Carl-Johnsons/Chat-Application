import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback } from "react";
import { useGlobalState } from "../globalState";

const useDisableNotifyUserTypingSubscription = () => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  const subscribeDisableNotifyUserTypingEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.RECEIVE_DISABLE_NOTIFY_USER_TYPING, () => {
        setUserTypingId(null);
      });
    },
    [setUserTypingId]
  );
  const unsubscribeDisableNotifyUserTypingEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_DISABLE_NOTIFY_USER_TYPING);
    },
    []
  );

  return {
    subscribeDisableNotifyUserTypingEvent,
    unsubscribeDisableNotifyUserTypingEvent,
  };
};

export default useDisableNotifyUserTypingSubscription;
