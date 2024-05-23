import { useRef } from "react";

import {
  Friend,
  FriendRequest,
  Message,
  SenderConversationModel,
} from "@/models";

import { useGlobalState } from "../globalState";

interface InvokeSignalREvent {
  name: string;
  args: unknown[];
}

const useSignalREvents = () => {
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
