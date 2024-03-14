import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useEffect } from "react";
import { SenderReceiverArray } from "../../models";
import { useGlobalState } from "../globalState";

const useNotifyUserTypingSubscription = (connection?: HubConnection) => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageType] = useGlobalState("messageType");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_NOTIFY_USER_TYPING,
      (model: SenderReceiverArray) => {
        if (
          (activeConversation === model.senderId &&
            model.type === "Individual") ||
          (activeConversation === model.receiverId && model.type === "Group")
        ) {
          setUserTypingId(model.senderId);
        }
      }
    );
    return () => {
      connection.off(SignalREvent.RECEIVE_NOTIFY_USER_TYPING);
    };
  }, [activeConversation, connection, messageType, setUserTypingId]);
};

export default useNotifyUserTypingSubscription;
