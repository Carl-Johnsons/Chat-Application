import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { useGlobalState } from "../GlobalState";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = (hubURL: string) => {
  const [userId] = useGlobalState("userId");
  const connRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    connRef.current = new HubConnectionBuilder()
      .withUrl(`${hubURL}?userId=${userId}`)
      .configureLogging(LogLevel.Information)
      .build();
    const startConnection = async () => {
      connRef.current &&
        (await connRef.current.start().catch((err) => console.error(err)));
    };
    const stopConnection = async () => {
      connRef.current && (await connRef.current.stop());
    };
    startConnection();
    return () => {
      stopConnection();
    };
  }, [hubURL, userId]);

  return connRef.current;
};

export default useSignalRConnection;
