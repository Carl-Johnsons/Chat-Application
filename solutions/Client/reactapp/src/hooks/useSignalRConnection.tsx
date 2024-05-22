import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "./globalState";
import { useLocalStorage } from ".";
import { useSubscribeSignalREvents } from "./signalREvents/useSubscribeSignalREvents";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = () => {
  const hubURL = process.env.NEXT_PUBLIC_SIGNALR_URL ?? "";
  const [waitingToReconnect, setWaitingToReconnect] = useState(false);
  console.log("=============================================");
  console.log({ hubURL });
  console.log(JSON.stringify(process.env));

  const [, setConnectionState] = useGlobalState("connectionState");
  const [getAccessToken] = useLocalStorage("access_token");
  const { subscribeAllEvents, unsubscribeAllEvents } =
    useSubscribeSignalREvents();
  // hook

  const connRef = useRef<HubConnection | null>(null);

  const startConnection = useCallback(async () => {
    if (!connRef.current) {
      return;
    }
    console.log("starting signalr");
    await connRef.current
      .start()
      .then(() => {
        subscribeAllEvents();
      })
      .catch((err) => console.error(err));
    setConnectionState(connRef.current?.state);
  }, [setConnectionState, subscribeAllEvents]);

  const stopConnection = useCallback(async () => {
    if (!connRef.current) {
      return;
    }
    console.log("stop signalr");
    await connRef.current.stop();
    unsubscribeAllEvents();
    setConnectionState(connRef.current?.state);
  }, [setConnectionState, unsubscribeAllEvents]);

  useEffect(() => {
    if (waitingToReconnect || connRef.current) {
      return;
    }
    setWaitingToReconnect(true);

    connRef.current = new HubConnectionBuilder()
      .withUrl(hubURL, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .configureLogging(LogLevel.Information)
      .build();
    connRef.current
      .start()
      .then(() => {
        subscribeAllEvents();
        setWaitingToReconnect(false);
      })
      .catch((err) => console.error(err));
  }, [getAccessToken, hubURL, subscribeAllEvents, waitingToReconnect]);

  return { connection: connRef.current, startConnection, stopConnection };
};

export { useSignalRConnection };
