import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useDeletePostSubscription = () => {
  const queryClient = useQueryClient();
  const subscribeDeletePostEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.DELETE_POST, () => {
        queryClient.invalidateQueries({
          queryKey: ["posts", "infinite"],
          exact: true,
        });
      });
    },
    [queryClient]
  );

  const unsubscribeDeletePostEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.DELETE_POST);
    },
    []
  );

  return {
    subscribeDeletePostEvent,
    unsubscribeDeletePostEvent,
  };
};

export { useDeletePostSubscription };
