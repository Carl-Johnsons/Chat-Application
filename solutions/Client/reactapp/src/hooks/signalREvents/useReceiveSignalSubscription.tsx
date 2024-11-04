import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../globalState";
import { SignalData } from "simple-peer";
import { useRouter } from "next/navigation";

const useReceiveSignalSubscription = () => {
  const [, setSignalData] = useGlobalState("signalData");
  const [, SetActiveConversationId] = useGlobalState("activeConversationId");
  const [userPeer, setUserPeer] = useGlobalState("userPeer");
  const userPeerRef = useRef(userPeer);
  const router = useRouter();
  useEffect(() => {
    userPeerRef.current = userPeer;
  }, [userPeer]);

  const subscribeReceiveSignalEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(
        SignalREvent.RECEIVE_SIGNAL,
        (signalData: string, conversationId: string) => {
          console.log("receive signal");
          setSignalData(JSON.parse(signalData) as SignalData);
          SetActiveConversationId(conversationId);
        }
      );
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
