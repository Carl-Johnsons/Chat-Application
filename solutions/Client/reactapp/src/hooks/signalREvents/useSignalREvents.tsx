import { useRef } from "react";
import { FriendRequest } from "@/models";
import { SendCallSignalDTO, UserTypingNotificationDTO } from "@/models/DTOs";
import { useSignalR } from "./useSignalR";

interface InvokeSignalREvent {
  name: string;
  args: unknown[];
}

const useSignalREvents = () => {
  const { connection } = useSignalR();

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
  console.log("call signalR OKKKK:", sendCallSignalDTO);
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
