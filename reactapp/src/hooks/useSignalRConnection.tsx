import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "./globalState";
import { useGetCurrentUser } from "./queries/user";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = (hubURL: string) => {
  const [, setConnectionState] = useGlobalState("connectionState");

  const connRef = useRef<HubConnection | null>(null);
  const { data: currentUser } = useGetCurrentUser();

  const startConnection = useCallback(async () => {
    if (!connRef.current) {
      return;
    }
    console.log("starting signalr");
    await connRef.current.start().catch((err) => console.error(err));
    setConnectionState(connRef.current?.state);
  }, [setConnectionState]);

  const stopConnection = useCallback(async () => {
    if (!connRef.current) {
      return;
    }
    console.log("stop signalr");
    await connRef.current.stop();
    setConnectionState(connRef.current?.state);
  }, [setConnectionState]);
  useEffect(() => {
    if (!currentUser) {
      return;
    }

    connRef.current = new HubConnectionBuilder()
      .withUrl(`${hubURL}?userId=${currentUser.userId}`)
      .configureLogging(LogLevel.Information)
      .build();
    console.log("The current state is: " + connRef.current?.state);
    startConnection();
    return () => {
      stopConnection();
    };
  }, [currentUser, hubURL, startConnection, stopConnection]);

  return connRef.current;
};

export { useSignalRConnection };
