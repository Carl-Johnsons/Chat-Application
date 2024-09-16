import { useContext, useRef } from "react";

import { FriendRequest } from "@/models";

import { CallDTO, UserTypingNotificationDTO } from "@/models/DTOs";
import { ChatHubContext } from "contexts/ChatHubContext";
import { SendSignalDTO } from "models/DTOs/SendSignal.dto";

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
export function signalRCall(callDTO: CallDTO) {
  return {
    name: "Call",
    args: [callDTO],
  };
}

export function signalRSendSignal(sendSignalDTO: SendSignalDTO) {
  return {
    name: "SendSignal",
    args: [sendSignalDTO],
  };
}

export function signalRAcceptCall(sendSignalDTO: SendSignalDTO) {
  console.log("call acceptCall hub")
  return {
    name: "AcceptCall",
    args: [sendSignalDTO],
  };
}

export { useSignalREvents };
