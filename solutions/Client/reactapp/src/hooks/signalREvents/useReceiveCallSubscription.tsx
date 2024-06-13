import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useCallback } from "react";
import { useModal } from "..";

const useReceiveCallSubscription = () => {
  const { handleShowModal } = useModal();

  const subscribeReceiveCallEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.RECEIVE_CALL, (callerId: string) => {
        console.log("receive call");
        console.log({ callerId });
        handleShowModal({ entityId: callerId, modalType: "Calling" });
      });
    },
    [handleShowModal]
  );

  const unsubscribeReceiveCallEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.RECEIVE_CALL);
    },
    []
  );

  return {
    subscribeReceiveCallEvent,
    unsubscribeReceiveCallEvent,
  };
};

export default useReceiveCallSubscription;
