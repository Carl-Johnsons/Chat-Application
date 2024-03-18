import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useEffect } from "react";
import { SenderConversationModel } from "../../models";
import { useGlobalState } from "../globalState";

const useNotifyUserTypingSubscription = (connection?: HubConnection) => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  const [activeConversationId] = useGlobalState("activeConversationId");
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_NOTIFY_USER_TYPING,
      (model: SenderConversationModel) => {
        if (activeConversationId === model.conversationId) {
          setUserTypingId(model.senderId);
        }
      }
    );
    return () => {
      connection.off(SignalREvent.RECEIVE_NOTIFY_USER_TYPING);
    };
  }, [activeConversationId, connection, setUserTypingId]);
};

export default useNotifyUserTypingSubscription;
