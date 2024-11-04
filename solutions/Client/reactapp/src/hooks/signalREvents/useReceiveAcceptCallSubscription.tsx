import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback, useRef, useEffect } from "react";
import { useGlobalState } from "../globalState";

const useReceiveAcceptCallSubscription = () => {
  const [userPeer] = useGlobalState("userPeer")
  const userPeerRef = useRef(userPeer);

  useEffect(() => {
    userPeerRef.current = userPeer;
  }, [userPeer]);

  const subscribeReceiveAcceptCallEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.RECEICE_ACCEPT_CALL, (signalData: string) => {
        console.log("receive accept call to pair");
        console.log("peer 1 signal to peer 2", userPeerRef.current);
        userPeerRef.current?.signal(JSON.parse(signalData));
      });
    },
    []
  );

  const unsubscribeReceiveAcceptCallEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEICE_ACCEPT_CALL);
    },
    []
  );

  return {
    subscribeReceiveAcceptCallEvent,
    unsubscribeReceiveAcceptCallEvent,
  };
};

export { useReceiveAcceptCallSubscription };
