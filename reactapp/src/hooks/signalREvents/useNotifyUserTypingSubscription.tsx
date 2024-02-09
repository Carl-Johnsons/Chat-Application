import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useEffect } from "react";
import { SenderReceiverArray } from "../../models";
import { useGlobalState } from "../../globalState";

const useNotifyUserTypingSubscription = (connection?: HubConnection) => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_NOTIFY_USER_TYPING,
      (model: SenderReceiverArray) => {
        setUserTypingId(model.senderIdList[0]);
      }
    );
    return () => {
      connection.off(SignalREvent.RECEIVE_NOTIFY_USER_TYPING);
    };
  }, [connection, setUserTypingId]);
};

export default useNotifyUserTypingSubscription;
