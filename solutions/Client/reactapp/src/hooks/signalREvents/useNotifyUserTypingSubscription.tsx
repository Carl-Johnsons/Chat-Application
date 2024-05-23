import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback } from "react";
import { SenderConversationModel } from "../../models";
import { useGlobalState } from "../globalState";

const useNotifyUserTypingSubscription = () => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  const [activeConversationId] = useGlobalState("activeConversationId");

  const subscribeNotifyUserTypingEvent = useCallback(
    (connection: HubConnection) => {
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
    },
    [activeConversationId, setUserTypingId]
  );

  const unsubscribeNotifyUserTypingEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_NOTIFY_USER_TYPING);
    },
    []
  );

  return {
    subscribeNotifyUserTypingEvent,
    unsubscribeNotifyUserTypingEvent,
  };
};

export default useNotifyUserTypingSubscription;
