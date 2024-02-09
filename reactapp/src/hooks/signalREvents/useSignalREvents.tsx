import { useEffect, useRef } from "react";
import { HubConnection } from "@microsoft/signalr";
import { FriendRequest, IndividualMessage } from "../../models";
import { useGlobalState } from "../../globalState";
import useIndividualMessageSubscription from "./useIndividualMessageSubscription";
import useFriendRequestSubscription from "./useFriendRequestSubscription";

interface SignalREvent {
  name: string;
  func: (...args: never[]) => void;
}
interface InvokeSignalREvent {
  name: string;
  args: object[];
}
interface useSignalREventsProps {
  connection?: HubConnection ;
  events?: SignalREvent[];
}

const useSignalREvents = ({ connection, events }: useSignalREventsProps) => {
  // global state
  const [connectionState, setConnectionState] =
    useGlobalState("connectionState");
  // hook
  useIndividualMessageSubscription(connection);
  useFriendRequestSubscription(connection);
  // ref
  const invokeActionRef = useRef<(e: InvokeSignalREvent) => void>(() => {});

  useEffect(() => {
    if (!connection) {
      return;
    }
    const handleConnectionStateChange = () => {
      if (!connection) {
        return;
      }
      setConnectionState(connection?.state);
    };
    connection.on("Connected", () => {
      handleConnectionStateChange();
    });
    return () => {
      connection.off("Connected");
    };
  }, [connection, setConnectionState]);

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
type sendAcceptFriendRequest = (senderId: number) => void;
type notifyUserTyping = (
  senderIdList: Array<number>,
  receiverIdList: Array<number>
) => void;
type disableNotifyUserTyping = (
  senderIdList: Array<number>,
  receiverIdList: Array<number>
) => void;

export function signalRSendIndividualMessage(im: IndividualMessage) {
  return {
    name: "SendIndividualMessage",
    args: [im],
  };
}
export function signalRSendFriendRequest(fr: FriendRequest) {
  return {
    name: "SendFriendRequest",
    args: [fr],
  };
}
export function signalRSendAcceptFriendRequest(func: sendAcceptFriendRequest) {
  return {
    name: "SendAcceptFriendRequest",
    func,
  };
}
export function signalRNotifyUserTyping(func: notifyUserTyping) {
  return {
    name: "NotifyUserTyping",
    func,
  };
}
export function signalRDisableNotifyUserTyping(func: disableNotifyUserTyping) {
  return {
    name: "DisableNotifyUserTyping",
    func,
  };
}
export { useSignalREvents };
