import { useEffect, useRef } from "react";
import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { FriendRequest, IndividualMessage } from "../models";
import { useGlobalState } from "../globalState";

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
  const [connectionState, setConnectionState] =
    useGlobalState("connectionState");

  const invokeActionRef = useRef<(e: InvokeSignalREvent) => void>(() => {});

  const handleConnectionStateChange = () => {
    setConnectionState(connection?.state || HubConnectionState.Disconnected);
    console.log("change state success!");
  };
  connection?.on("Connected", () => {
    handleConnectionStateChange();
    console.log("signalR Connected");
  });

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
export { useSignalREvents };
