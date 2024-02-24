import { HubConnection } from "@microsoft/signalr";
import { useEffect, useRef } from "react";

import {
  Friend,
  FriendRequest,
  GroupMessage,
  IndividualMessage,
  SenderReceiverArray,
} from "@/models";

import { useGlobalState } from "../globalState";
import useIndividualMessageSubscription from "./useIndividualMessageSubscription";
import useFriendRequestSubscription from "./useFriendRequestSubscription";
import useConnectedSubscription from "./useConnectedSubscription";
import useNotifyUserTypingSubscription from "./useNotifyUserTypingSubscription";
import useDisableNotifyUserTypingSubscription from "./useDisableNotifyUserTypingSubscription";
import useAcceptedFriendRequestSubscription from "./useAcceptedFriendRequestSubscription";
import useDisconnectedSubscription from "./useDisconnectedSubscription";
import useGroupMessageSubscription from "./useGroupMessageSubscription";

interface SignalREvent {
  name: string;
  func: (...args: never[]) => void;
}
interface InvokeSignalREvent {
  name: string;
  args: object[];
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
  useIndividualMessageSubscription(connection);
  useGroupMessageSubscription(connection);
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

export function signalRSendIndividualMessage(im: IndividualMessage) {
  return {
    name: "SendIndividualMessage",
    args: [im],
  };
}
export function signalRSendGroupMessage(gm: GroupMessage) {
  return {
    name: "SendGroupMessage",
    args: [gm],
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
  senderReceiverArray: SenderReceiverArray
) {
  return {
    name: "NotifyUserTyping",
    args: [senderReceiverArray],
  };
}
export function signalRDisableNotifyUserTyping(
  senderReceiverArray: SenderReceiverArray
) {
  return {
    name: "DisableNotifyUserTyping",
    args: [senderReceiverArray],
  };
}
export { useSignalREvents };
