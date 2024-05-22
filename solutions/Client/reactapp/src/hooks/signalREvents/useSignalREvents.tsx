import { HubConnection } from "@microsoft/signalr";
import { useEffect, useRef } from "react";

import {
  Friend,
  FriendRequest,
  Message,
  SenderConversationModel,
} from "@/models";

import { useGlobalState } from "../globalState";

interface SignalREvent {
  name: string;
  func: (...args: never[]) => void;
}
interface InvokeSignalREvent {
  name: string;
  args: unknown[];
}
interface useSignalREventsProps {
  connection?: HubConnection;
  events?: SignalREvent[];
}

const useSignalREvents = ({ events }: useSignalREventsProps) => {
  // global state
  const [connection] = useGlobalState("connection");
  const [connectionState] = useGlobalState("connectionState");

  // ref
  const invokeActionRef = useRef<(e: InvokeSignalREvent) => void>(() => {});

  invokeActionRef.current = ({ name, args }: InvokeSignalREvent) => {
    console.log(`Invoke ${name}`);
    if (!connection || connectionState !== "Connected") {
      return;
    }

    connection.invoke(name, ...args).catch((err) => {
      console.error(`Error invoking ${name}: ${err}`);
    });
  };

  useEffect(() => {
    if (!events) {
      return;
    }
    events.forEach((event) => {
      connection?.on(event.name, event.func);
    });
    return () => {
      events.forEach((event) => {
        connection?.off(event.name);
      });
    };
  }, [connection, events]);

  return {
    invokeAction: invokeActionRef.current,
  };
};

export function signalRSendMessage(m: Message) {
  return {
    name: "SendMessage",
    args: [m],
  };
}

export function signalRSendFriendRequest(fr: FriendRequest) {
  return {
    name: "SendFriendRequest",
    args: [fr],
  };
}
export function signalRSendAcceptFriendRequest(f: Friend) {
  return {
    name: "SendAcceptFriendRequest",
    args: [f],
  };
}
export function signalRNotifyUserTyping(
  senderConversationModel: SenderConversationModel
) {
  return {
    name: "NotifyUserTyping",
    args: [senderConversationModel],
  };
}
export function signalRDisableNotifyUserTyping(
  senderConversationModel: SenderConversationModel
) {
  return {
    name: "DisableNotifyUserTyping",
    args: [senderConversationModel],
  };
}
export function signalRJoinConversation(
  userId: string,
  conversationId: string
) {
  return {
    name: "JoinConversation",
    args: [userId, conversationId],
  };
}
export { useSignalREvents };
