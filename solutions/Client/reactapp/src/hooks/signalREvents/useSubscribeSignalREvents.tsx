import { useCallback } from "react";

import { useGlobalState } from "../globalState";
import useConnectedSubscription from "./useConnectedSubscription";
import useAcceptedFriendRequestSubscription from "./useAcceptedFriendRequestSubscription";
import useDisableNotifyUserTypingSubscription from "./useDisableNotifyUserTypingSubscription";
import useDisconnectedSubscription from "./useDisconnectedSubscription";
import useFriendRequestSubscription from "./useFriendRequestSubscription";
import useJoinConversationSubscription from "./useJoinConversationSubscription";
import useMessageSubscription from "./useMessageSubscription";
import useNotifyUserTypingSubscription from "./useNotifyUserTypingSubscription";

const useSubscribeSignalREvents = () => {
  // global state
  const [connection] = useGlobalState("connection");
  const { subscribeConnectedEvent, unsubscribeConnectedEvent } =
    useConnectedSubscription(connection);
  const {
    subscribeAcceptFriendRequestEvent,
    unsubscribeAcceptFriendRequestEvent,
  } = useAcceptedFriendRequestSubscription(connection);
  const {
    subscribeDisableNotifyUserTypingEvent,
    unsubscribeDisableNotifyUserTypingEvent,
  } = useDisableNotifyUserTypingSubscription(connection);

  const { subscribeDisconnectedEvent, unsubscribeDisconnectedEvent } =
    useDisconnectedSubscription(connection);

  const { subscribeFriendRequestEvent, unsubscribeFriendRequestEvent } =
    useFriendRequestSubscription(connection);

  const { subscribeJoinConversationEvent, unsubscribeJoinConversationEvent } =
    useJoinConversationSubscription(connection);

  const { subscribeMessageEvent, unsubscribeMessageEvent } =
    useMessageSubscription(connection);

  const { subscribeNotifyUserTypingEvent, unsubscribeNotifyUserTypingEvent } =
    useNotifyUserTypingSubscription(connection);

  const subscribeAllEvents = useCallback(() => {
    subscribeConnectedEvent();
    subscribeAcceptFriendRequestEvent();
    subscribeDisableNotifyUserTypingEvent();
    subscribeDisconnectedEvent();
    subscribeFriendRequestEvent();
    subscribeJoinConversationEvent();
    subscribeMessageEvent();
    subscribeNotifyUserTypingEvent();
  }, [
    subscribeAcceptFriendRequestEvent,
    subscribeConnectedEvent,
    subscribeDisableNotifyUserTypingEvent,
    subscribeDisconnectedEvent,
    subscribeFriendRequestEvent,
    subscribeJoinConversationEvent,
    subscribeMessageEvent,
    subscribeNotifyUserTypingEvent,
  ]);

  const unsubscribeAllEvents = useCallback(() => {
    unsubscribeConnectedEvent();
    unsubscribeAcceptFriendRequestEvent();
    unsubscribeDisableNotifyUserTypingEvent();
    unsubscribeDisconnectedEvent();
    unsubscribeFriendRequestEvent();
    unsubscribeJoinConversationEvent();
    unsubscribeMessageEvent();
    unsubscribeNotifyUserTypingEvent();
  }, [
    unsubscribeAcceptFriendRequestEvent,
    unsubscribeConnectedEvent,
    unsubscribeDisableNotifyUserTypingEvent,
    unsubscribeDisconnectedEvent,
    unsubscribeFriendRequestEvent,
    unsubscribeJoinConversationEvent,
    unsubscribeMessageEvent,
    unsubscribeNotifyUserTypingEvent,
  ]);

  return {
    subscribeAllEvents,
    unsubscribeAllEvents,
  };
};
export { useSubscribeSignalREvents };
