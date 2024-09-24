import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback } from "react";
import { useGlobalState } from "../globalState";
import { SignalData } from "simple-peer";


const useReceiveSignalSubscription = () => {

  const [, setSignalData] = useGlobalState("signalData");
  const [, SetActiveConversationId] = useGlobalState("activeConversationId");
  const subscribeReceiveSignalEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.RECEIVE_SIGNAL, (signalData: string, conversationId: string) => {
        console.log("receive signal");
        setSignalData(JSON.parse(signalData) as SignalData);
        SetActiveConversationId(conversationId);
        console.log(signalData);
      });
    },
    []
  );

  const unsubscribeReceiveSignalEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_SIGNAL);
    },
    []
  );

  return {
    subscribeReceiveSignalEvent,
    unsubscribeReceiveSignalEvent,
  };
};

export { useReceiveSignalSubscription };
