import { useCallback } from "react";
import { HubConnection } from "@microsoft/signalr";
import {
  useAcceptedFriendRequestSubscription,
  useConnectedSubscription,
  useDeletePostSubscription,
  useDisableNotifyUserTypingSubscription,
  useDisbandGroupConversationSubscription,
  useDisconnectedSubscription,
  useForcedLogoutSubscription,
  useFriendRequestSubscription,
  useJoinConversationSubscription,
  useMessageSubscription,
  useNotifyUserTypingSubscription,
  useReceiveCallSubscription,
  useReceiveSignalSubscription,
  useReceiveAcceptCallSubscription,
  useReportPostSubscription
} from ".";

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

  const { subscribeReceiveSignalEvent, unsubscribeReceiveSignalEvent } =
    useReceiveSignalSubscription();

  const { subscribeReceiveAcceptCallEvent, unsubscribeReceiveAcceptCallEvent } =
    useReceiveAcceptCallSubscription();

  const { subscribeForcedLogoutEvent, unsubscribeForcedLogoutEvent } =
    useForcedLogoutSubscription();

  const { subscribeDeletePostEvent, unsubscribeDeletePostEvent } =
    useDeletePostSubscription();

  const { subscribeReportPostEvent, unsubscribeReportPostEvent } =
    useReportPostSubscription();
  const {
    subscribeDisbandGroupConversationEvent,
    unsubscribeDisbandGroupConversationEvent,
  } = useDisbandGroupConversationSubscription();

  const subscribeAllEvents = useCallback(
    (connection: HubConnection) => {
      subscribeAcceptFriendRequestEvent(connection);
      subscribeConnectedEvent(connection);
      subscribeDeletePostEvent(connection);
      subscribeDisableNotifyUserTypingEvent(connection);
      subscribeDisbandGroupConversationEvent(connection);
      subscribeDisconnectedEvent(connection);
      subscribeForcedLogoutEvent(connection);
      subscribeFriendRequestEvent(connection);
      subscribeJoinConversationEvent(connection);
      subscribeMessageEvent(connection);
      subscribeNotifyUserTypingEvent(connection);
      subscribeReceiveCallEvent(connection);
      subscribeReceiveSignalEvent(connection);
      subscribeReceiveAcceptCallEvent(connection);
      subscribeReportPostEvent(connection);
    },
    []
  );

  const unsubscribeAllEvents = useCallback((connection: HubConnection) => {
    unsubscribeAcceptFriendRequestEvent(connection);
    unsubscribeConnectedEvent(connection);
    unsubscribeDeletePostEvent(connection);
    unsubscribeDisableNotifyUserTypingEvent(connection);
    unsubscribeDisbandGroupConversationEvent(connection);
    unsubscribeDisconnectedEvent(connection);
    unsubscribeForcedLogoutEvent(connection);
    unsubscribeFriendRequestEvent(connection);
    unsubscribeJoinConversationEvent(connection);
    unsubscribeMessageEvent(connection);
    unsubscribeNotifyUserTypingEvent(connection);
    unsubscribeReceiveCallEvent(connection);
    unsubscribeReceiveSignalEvent(connection);
    unsubscribeReceiveAcceptCallEvent(connection);
    unsubscribeReportPostEvent(connection);
  }, []);

  return {
    subscribeAllEvents,
    unsubscribeAllEvents,
  };
};
export { useSubscribeSignalREvents };
