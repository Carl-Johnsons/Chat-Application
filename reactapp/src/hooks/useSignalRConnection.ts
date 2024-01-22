import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useRef } from "react";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = (hubURL: string) => {
  const connRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    connRef.current = new HubConnectionBuilder()
      .withUrl(hubURL)
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
  }, [hubURL]);

  return connRef.current;
};

export default useSignalRConnection;
