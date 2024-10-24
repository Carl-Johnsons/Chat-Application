import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useGetCurrentUser } from "hooks/queries/user/useGetCurrentUser.query";
import { useSubscribeSignalREvents } from "hooks/signalREvents/useSubscribeSignalREvents";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface ChatHubContextType {
  connection: HubConnection | null;
  startConnection: () => Promise<void>;
  stopConnection: () => Promise<void>;
  connected: boolean;
}

interface Props {
  children: React.ReactNode;
}

const ChatHubContext = createContext<ChatHubContextType | null>(null);

const ChatHubProvider = ({ children }: Props) => {
  const hubURL = process.env.NEXT_PUBLIC_SIGNALR_URL ?? "";
  const [waitingToReconnect, setWaitingToReconnect] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  const { subscribeAllEvents, unsubscribeAllEvents } =
    useSubscribeSignalREvents();
  const { data: session } = useSession();
  const connectionRef = useRef<HubConnection | null>(null);

  const startConnection = useCallback(async () => {
    if (!connectionRef.current) {
      return;
    }
    console.log("starting signalr");
    connectionRef.current
      .start()
      .then(() => {
        connectionRef.current && subscribeAllEvents(connectionRef.current);
        setWaitingToReconnect(false);
      })
      .catch((err) => console.error(err));
  }, [subscribeAllEvents]);

  const stopConnection = useCallback(async () => {
    if (!connectionRef.current) {
      return;
    }
    console.log("stop signalr");
    await connectionRef.current.stop();
    unsubscribeAllEvents(connectionRef.current);
  }, [unsubscribeAllEvents]);

  useEffect(() => {
    if (waitingToReconnect || connectionRef.current || !currentUser) {
      return;
    }
    setWaitingToReconnect(true);

    connectionRef.current = new HubConnectionBuilder()
      .withUrl(`${hubURL}?userId=${currentUser.id}`, {
        accessTokenFactory: () => session?.accessToken ?? "",
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    startConnection();
  }, [
    session?.accessToken,
    currentUser,
    hubURL,
    startConnection,
    subscribeAllEvents,
    waitingToReconnect,
  ]);

  return (
    <ChatHubContext.Provider
      value={{
        connection: connectionRef.current,
        startConnection,
        stopConnection,
        connected: !waitingToReconnect,
      }}
    >
      {children}
    </ChatHubContext.Provider>
  );
};

export { ChatHubProvider, ChatHubContext };
