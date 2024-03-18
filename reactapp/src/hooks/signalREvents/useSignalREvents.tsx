import { HubConnection } from "@microsoft/signalr";
import { useEffect, useRef } from "react";

import {
  Friend,
  FriendRequest,
  Message,
  SenderConversationModel,
} from "@/models";

import { useGlobalState } from "../globalState";
import useMessageSubscription from "./useMessageSubscription";
import useFriendRequestSubscription from "./useFriendRequestSubscription";
import useConnectedSubscription from "./useConnectedSubscription";
import useNotifyUserTypingSubscription from "./useNotifyUserTypingSubscription";
import useDisableNotifyUserTypingSubscription from "./useDisableNotifyUserTypingSubscription";
import useAcceptedFriendRequestSubscription from "./useAcceptedFriendRequestSubscription";
import useDisconnectedSubscription from "./useDisconnectedSubscription";
import useJoinConversationSubscription from "./useJoinConversationSubscription";

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

const useSignalREvents = ({ connection, events }: useSignalREventsProps) => {
  // global state
  const [connectionState] = useGlobalState("connectionState");
  // hook
  useAcceptedFriendRequestSubscription(connection);
  useConnectedSubscription(connection);
  useDisableNotifyUserTypingSubscription(connection);
  useDisconnectedSubscription(connection);
  useFriendRequestSubscription(connection);
  useJoinConversationSubscription(connection);
  useMessageSubscription(connection);
  useNotifyUserTypingSubscription(connection);
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

  return invokeActionRef.current;
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
  userId: number,
  conversationId: number
) {
  return {
    name: "JoinConversation",
    args: [userId, conversationId],
  };
}
export { useSignalREvents };
