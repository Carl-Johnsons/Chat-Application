import { useEffect, useRef, useState } from "react";
import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { FriendRequest, IndividualMessage } from "../Models";

interface SignalREvent {
  name: string;
  func: (...args: never[]) => void;
}
interface InvokeSignalREvent {
  name: string;
  args: object[];
}
interface useSignalREventsProps {
  connection: HubConnection | null;
  events?: SignalREvent[];
}

const useSignalREvents = ({ connection, events }: useSignalREventsProps) => {
  const [connectionState, setConnectionState] = useState<HubConnectionState>(
    connection?.state || HubConnectionState.Disconnected
  );

  const invokeActionRef = useRef<(e: InvokeSignalREvent) => void>(() => {});

  useEffect(() => {
    if (!connection) {
      return;
    }
    const handleConnectionStateChange = () => {
      setConnectionState(connection.state);
      console.log("reconneted success");
    };
    connection.onreconnected(handleConnectionStateChange);
    connection.onreconnecting(handleConnectionStateChange);
    return () => {};
  }, [connection]);

  useEffect(() => {
    if (!connection) {
      return;
    }
    invokeActionRef.current = ({ name, args }: InvokeSignalREvent) => {
      console.log(`Invoke ${name}`);
      if (!connection || connectionState !== "Connected") {
        return;
      }

      connection.invoke(name, ...args).catch((err) => {
        console.error(`Error invoking ${name}: ${err}`);
      });
    };
    if (!events) {
      return;
    }
    events.forEach((event) => {
      connection.on(event.name, event.func);
    });
    return () => {
      events.forEach((event) => {
        connection.off(event.name);
      });
    };
  }, [connection, connectionState, events]);
  return invokeActionRef.current;
};
type sendFriendRequest = (fr: FriendRequest) => void;
type sendAcceptFriendRequest = (senderId: number) => void;
type notifyUserTyping = (
  senderIdList: Array<number>,
  receiverIdList: Array<number>
) => void;
type disableNotifyUserTyping = (
  senderIdList: Array<number>,
  receiverIdList: Array<number>
) => void;

export function sendIndividualMessage(im: IndividualMessage) {
  return {
    name: "SendIndividualMessage",
    args: [im],
  };
}
export function sendFriendRequest(func: sendFriendRequest) {
  return {
    name: "SendFriendRequest",
    func,
  };
}
export function sendAcceptFriendRequest(func: sendAcceptFriendRequest) {
  return {
    name: "SendAcceptFriendRequest",
    func,
  };
}
export function notifyUserTyping(func: notifyUserTyping) {
  return {
    name: "NotifyUserTyping",
    func,
  };
}
export function disableNotifyUserTyping(func: disableNotifyUserTyping) {
  return {
    name: "DisableNotifyUserTyping",
    func,
  };
}
export default useSignalREvents;
