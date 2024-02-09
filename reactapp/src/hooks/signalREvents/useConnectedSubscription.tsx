import { useEffect } from "react";
import { useGlobalState } from "../../globalState";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";

const useConnectedSubscription = (connection?: HubConnection) => {
  const [, setConnectionState] = useGlobalState("connectionState");
  useEffect(() => {
    if (!connection) {
      return;
    }
    const handleConnectionStateChange = () => {
      if (!connection) {
        return;
      }
      setConnectionState(connection?.state);
    };
    connection.on(SignalREvent.CONNECTED, () => {
      handleConnectionStateChange();
    });
    return () => {
      connection.off(SignalREvent.CONNECTED);
    };
  }, [connection, setConnectionState]);
};

export default useConnectedSubscription;
