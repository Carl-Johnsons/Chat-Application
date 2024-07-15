import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGlobalState } from "..";

const useDisbandGroupConversationSubscription = () => {
  const queryClient = useQueryClient();
  const [activeConversationId, setActiveConversationId] = useGlobalState(
    "activeConversationId"
  );
  console.log("In useDisbandGroupConversationSubscription");

  console.log({ activeConversationId });

  const receiveDisbandConversationHandler = useCallback(
    (conversationId: string) => {
      console.log("Received disband event:", conversationId);
      console.log("Current active conversation:", activeConversationId);

      const currentActiveConversationId = activeConversationId;

      if (currentActiveConversationId === conversationId) {
        setActiveConversationId("");
      }

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        exact: true,
      });
    },
    [activeConversationId]
  );
  const subscribeDisbandGroupConversationEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      console.log("add event");

      connection.on(
        SignalREvent.RECEIVE_DISBAND_CONVERSATION,
        receiveDisbandConversationHandler
      );
      // Return cleanup function
      return () => {
        console.log("remove event");

        connection.off(
          SignalREvent.RECEIVE_DISBAND_CONVERSATION,
          receiveDisbandConversationHandler
        );
      };
    },
    [receiveDisbandConversationHandler]
  );
  const unsubscribeDisbandGroupConversationEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_DISBAND_CONVERSATION);
    },
    []
  );

  return {
    subscribeDisbandGroupConversationEvent,
    unsubscribeDisbandGroupConversationEvent,
  };
};

export { useDisbandGroupConversationSubscription };
