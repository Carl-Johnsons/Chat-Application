import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";
import { useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../globalState";

// Need some best practice or something, current the connection in the App keep re-rendering this hook
const useSignalRConnection = (hubURL: string) => {
  const [userId] = useGlobalState("userId");
  const [userMap, setUserMap] = useGlobalState("userMap");
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
    console.log("The current state is: " + connRef.current?.state);
  }, [hubURL, userId]);

  useEffect(() => {
    if (!connRef.current) {
      return;
    }
    // Still bug that isOnline only exist for some user, not all
    connRef.current.on("Connected", (userIdOnlineList: number[]) => {
      let isChanged = false;
      const newUserMap = new Map([...userMap]);
      userIdOnlineList.forEach((userId) => {
        const user = newUserMap.get(userId);
        if (user) {
          isChanged = true;
          newUserMap.set(userId, { ...user, isOnline: true });
          console.log({ user });
        }
      });
      if (isChanged) {
        setUserMap(newUserMap);
      }
      console.log(newUserMap);
      console.log(userIdOnlineList);

      setConnectionState(HubConnectionState.Connected);
      console.log("signalR Connected");
    });
    return () => {
      if (!connRef.current) {
        return;
      }
      connRef.current.off("Connected");
    };
  }, [setConnectionState, setUserMap, userMap]);

  useEffect(() => {
    if (!connRef.current) {
      return;
    }
    connRef.current.on("Disconnected", (userDisconnectedId: number) => {
      let isChanged = false;
      const newUserMap = new Map(userMap);
      const user = newUserMap.get(userDisconnectedId);
      if (user) {
        isChanged = true;
        user.isOnline = false;
      }
      if (isChanged) {
        setUserMap(newUserMap);
      }
      setConnectionState(HubConnectionState.Disconnected);
      console.log("signalR Disconnected");
    });
    return () => {
      if (!connRef.current) {
        return;
      }
      connRef.current.off("Disconnected");
    };
  }, [setConnectionState, userMap]);

  const startConnection = useCallback(async () => {
    if (!connRef.current) {
      return;
    }
    console.log("starting signalr");
    await connRef.current.start().catch((err) => console.error(err));
  }, [connRef.current]);

  const stopConnection = useCallback(async () => {
    console.log("stop signalr");
    connRef.current && (await connRef.current.stop());
  }, [connRef.current]);

  useEffect(() => {
    startConnection();
    return () => {
      stopConnection();
    };
  }, [startConnection, stopConnection]);

  return connRef.current;
};

export { useSignalRConnection };
