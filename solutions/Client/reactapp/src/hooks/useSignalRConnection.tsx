import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "./globalState";
import { useSubscribeSignalREvents } from "./signalREvents/useSubscribeSignalREvents";
import { useGetCurrentUser } from "./queries/user";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = () => {
  const hubURL = process.env.NEXT_PUBLIC_SIGNALR_URL ?? "";
  const [waitingToReconnect, setWaitingToReconnect] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  const [, setConnectionState] = useGlobalState("connectionState");
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
      .then(() => {})
      .catch((err) => console.error(err));
    setConnectionState(connRef.current?.state);
  }, [setConnectionState]);

  const stopConnection = useCallback(async () => {
    if (!connRef.current) {
      return;
    }
    console.log("stop signalr");
    await connRef.current.stop();
    unsubscribeAllEvents(connRef.current);
    setConnectionState(connRef.current?.state);
  }, [setConnectionState, unsubscribeAllEvents]);

  useEffect(() => {
    if (waitingToReconnect || connRef.current || !currentUser) {
      return;
    }
    setWaitingToReconnect(true);
    connRef.current = new HubConnectionBuilder()
      .withUrl(`${hubURL}?userId=${currentUser.id}`)
      .configureLogging(LogLevel.Information)
      .build();

    connRef.current
      .start()
      .then(() => {
        console.log(
          "==========================SIGNALR CONNECTED =========================="
        );

        connRef.current && subscribeAllEvents(connRef.current);
        setWaitingToReconnect(false);
        console.log(
          "==========================SIGNALR EVENTS SUBSCRIBED =========================="
        );
      })
      .catch((err) => console.error(err));
  }, [currentUser, hubURL, subscribeAllEvents, waitingToReconnect]);

  return { connection: connRef.current, startConnection, stopConnection };
};

export { useSignalRConnection };
