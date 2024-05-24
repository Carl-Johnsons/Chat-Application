import { useRef } from "react";

import { Friend, FriendRequest, Message } from "@/models";

import { useGlobalState } from "../globalState";
import { UserTypingNotificationDTO } from "@/models/DTOs";

interface InvokeSignalREvent {
  name: string;
  args: unknown[];
}

const useSignalREvents = () => {
  // global state
  const [connection] = useGlobalState("connection");

  // ref
  const invokeActionRef = useRef<(e: InvokeSignalREvent) => void>(() => {});

  invokeActionRef.current = ({ name, args }: InvokeSignalREvent) => {
    if (!connection) {
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
  userTypingNotificationDTO: UserTypingNotificationDTO
) {
  return {
    name: "NotifyUserTyping",
    args: [userTypingNotificationDTO],
  };
}
export function signalRDisableNotifyUserTyping(
  userTypingNotificationDTO: UserTypingNotificationDTO
) {
  return {
    name: "DisableNotifyUserTyping",
    args: [userTypingNotificationDTO],
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
