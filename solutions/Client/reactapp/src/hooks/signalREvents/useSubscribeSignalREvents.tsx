import { useCallback } from "react";

import useConnectedSubscription from "./useConnectedSubscription";
import useAcceptedFriendRequestSubscription from "./useAcceptedFriendRequestSubscription";
import useDisableNotifyUserTypingSubscription from "./useDisableNotifyUserTypingSubscription";
import useDisconnectedSubscription from "./useDisconnectedSubscription";
import useFriendRequestSubscription from "./useFriendRequestSubscription";
import useJoinConversationSubscription from "./useJoinConversationSubscription";
import useMessageSubscription from "./useMessageSubscription";
import useNotifyUserTypingSubscription from "./useNotifyUserTypingSubscription";
import { HubConnection } from "@microsoft/signalr";
import useReceiveCallSubscription from "./useReceiveCallSubscription";

const useSubscribeSignalREvents = () => {
  // global state
  const { subscribeConnectedEvent, unsubscribeConnectedEvent } =
    useConnectedSubscription();
  const {
    subscribeAcceptFriendRequestEvent,
    unsubscribeAcceptFriendRequestEvent,
  } = useAcceptedFriendRequestSubscription();
  const {
    subscribeDisableNotifyUserTypingEvent,
    unsubscribeDisableNotifyUserTypingEvent,
  } = useDisableNotifyUserTypingSubscription();

  const { subscribeDisconnectedEvent, unsubscribeDisconnectedEvent } =
    useDisconnectedSubscription();

  const { subscribeFriendRequestEvent, unsubscribeFriendRequestEvent } =
    useFriendRequestSubscription();

  const { subscribeJoinConversationEvent, unsubscribeJoinConversationEvent } =
    useJoinConversationSubscription();

  const { subscribeMessageEvent, unsubscribeMessageEvent } =
    useMessageSubscription();

  const { subscribeNotifyUserTypingEvent, unsubscribeNotifyUserTypingEvent } =
    useNotifyUserTypingSubscription();

  const { subscribeReceiveCallEvent, unsubscribeReceiveCallEvent } =
    useReceiveCallSubscription();

  const subscribeAllEvents = useCallback(
    (connection: HubConnection) => {
      subscribeConnectedEvent(connection);
      subscribeAcceptFriendRequestEvent(connection);
      subscribeDisableNotifyUserTypingEvent(connection);
      subscribeDisconnectedEvent(connection);
      subscribeFriendRequestEvent(connection);
      subscribeJoinConversationEvent(connection);
      subscribeMessageEvent(connection);
      subscribeNotifyUserTypingEvent(connection);
      subscribeReceiveCallEvent(connection);
    },
    [
      subscribeAcceptFriendRequestEvent,
      subscribeConnectedEvent,
      subscribeDisableNotifyUserTypingEvent,
      subscribeDisconnectedEvent,
      subscribeFriendRequestEvent,
      subscribeJoinConversationEvent,
      subscribeMessageEvent,
      subscribeNotifyUserTypingEvent,
      subscribeReceiveCallEvent,
    ]
  );

  const unsubscribeAllEvents = useCallback(
    (connection: HubConnection) => {
      unsubscribeConnectedEvent(connection);
      unsubscribeAcceptFriendRequestEvent(connection);
      unsubscribeDisableNotifyUserTypingEvent(connection);
      unsubscribeDisconnectedEvent(connection);
      unsubscribeFriendRequestEvent(connection);
      unsubscribeJoinConversationEvent(connection);
      unsubscribeMessageEvent(connection);
      unsubscribeNotifyUserTypingEvent(connection);
      unsubscribeReceiveCallEvent(connection);
    },
    [
      unsubscribeAcceptFriendRequestEvent,
      unsubscribeConnectedEvent,
      unsubscribeDisableNotifyUserTypingEvent,
      unsubscribeDisconnectedEvent,
      unsubscribeFriendRequestEvent,
      unsubscribeJoinConversationEvent,
      unsubscribeMessageEvent,
      unsubscribeNotifyUserTypingEvent,
      unsubscribeReceiveCallEvent,
    ]
  );

  return {
    subscribeAllEvents,
    unsubscribeAllEvents,
  };
};
export { useSubscribeSignalREvents };
