import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { useGlobalState } from "..";
import { SignalREvent } from "data/constants";
import { useRouter } from "next/navigation";

const useForcedLogoutSubscription = () => {
  const [, setUserIdsOnlineList] = useGlobalState("userIdsOnlineList");
  const router = useRouter();
  const subscribeForcedLogoutEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.FORCED_LOGOUT, () => {
        router.push("/logout");
      });
    },
    [setUserIdsOnlineList]
  );

  const unsubscribeForcedLogoutEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.FORCED_LOGOUT);
    },
    []
  );

  return {
    subscribeForcedLogoutEvent,
    unsubscribeForcedLogoutEvent,
  };
};

export default useForcedLogoutSubscription;
