import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../globalState";
import { UserTypingNotificationDTO } from "@/models/DTOs";

const useNotifyUserTypingSubscription = () => {
  const [, setUserTypingId] = useGlobalState("userTypingId");
  const [activeConversationId] = useGlobalState("activeConversationId");

  const activeConversationIdRef = useRef(activeConversationId);

  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  const subscribeNotifyUserTypingEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(
        SignalREvent.RECEIVE_NOTIFY_USER_TYPING,
        (model: UserTypingNotificationDTO) => {
          console.log({ model });
          console.log(activeConversationIdRef.current);
          console.log(
            "activeConversationId === model.conversationId : " +
              (activeConversationIdRef.current === model.conversationId)
          );

          if (activeConversationIdRef.current === model.conversationId) {
            setUserTypingId(model.senderId);
          }
        }
      );
    },
    [setUserTypingId]
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
