import { useContext, useRef } from "react";

import { FriendRequest } from "@/models";

import { SendCallSignalDTO, UserTypingNotificationDTO } from "@/models/DTOs";
import { ChatHubContext } from "contexts/ChatHubContext";

interface InvokeSignalREvent {
  name: string;
  args: unknown[];
}

const useSignalREvents = () => {
  // global state
  const context = useContext(ChatHubContext);
  if (!context) {
    throw new Error("useSignalREvents must be used within ChatHubProvider");
  }
  const { connection } = context;

  // ref
  const invokeActionRef = useRef<(e: InvokeSignalREvent) => void>(() => { });

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

export function signalRSendFriendRequest(fr: FriendRequest) {
  return {
    name: "SendFriendRequest",
    args: [fr],
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

export function signalRSendCallSignal(sendCallSignalDTO: SendCallSignalDTO) {
  return {
    name: "SendCallSignal",
    args: [sendCallSignalDTO],
  };
}

export function signalRAcceptCall(sendCallSignalDTO: SendCallSignalDTO) {
  return {
    name: "AcceptCall",
    args: [sendCallSignalDTO],
  };
}

export { useSignalREvents };
