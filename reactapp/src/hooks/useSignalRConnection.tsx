import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { useGlobalState } from "../GlobalState";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = (hubURL: string) => {
  const [userId] = useGlobalState("userId");
  const [, setConnectionState] = useGlobalState("connectionState");

  const connRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    connRef.current = new HubConnectionBuilder()
      .withUrl(`${hubURL}?userId=${userId}`)
      .configureLogging(LogLevel.Information)
      .build();

    connRef.current.on("Connected", () => {
      setConnectionState(HubConnectionState.Connected);
      console.log("signalR Connected");
    });
    connRef.current.on("Disconnected", () => {
      setConnectionState(HubConnectionState.Disconnected);
      console.log("signalR Disconnected");
    });

    const startConnection = async () => {
      if (!connRef.current) {
        return;
      }

      await connRef.current.start().catch((err) => console.error(err));
    };
    const stopConnection = async () => {
      connRef.current && (await connRef.current.stop());
    };
    startConnection();
    return () => {
      if (!connRef.current) {
        return;
      }
      stopConnection();
      connRef.current.off("Connected");
      connRef.current.off("Disconnected");
    };
  }, [hubURL, setConnectionState, userId]);

  return connRef.current;
};

export { useSignalRConnection };
