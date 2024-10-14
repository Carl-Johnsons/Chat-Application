import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../globalState";
import { SignalData } from "simple-peer";

const useReceiveSignalSubscription = () => {


  const [, setSignalData] = useGlobalState("signalData");
  const [, SetActiveConversationId] = useGlobalState("activeConversationId");
  const [userPeer, setUserPeer] = useGlobalState("userPeer")
  const userPeerRef = useRef(userPeer);

  useEffect(() => {
    userPeerRef.current = userPeer;
  }, [userPeer]);

  const subscribeReceiveSignalEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.RECEIVE_SIGNAL, (signalData: string, conversationId: string) => {
        console.log("receive signal");
        if (userPeerRef.current) {
          console.log("has userpeer so connect again");
          userPeerRef.current.destroy();
          userPeerRef.current = null;
          setUserPeer(null);
        }
        setSignalData(JSON.parse(signalData) as SignalData);
        SetActiveConversationId(conversationId);
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
