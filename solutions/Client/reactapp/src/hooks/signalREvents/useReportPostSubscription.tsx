import { HubConnection } from "@microsoft/signalr";
import { useCallback } from "react";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useReportPostSubscription = () => {
  const queryClient = useQueryClient();
  const subscribeReportPostEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.on(SignalREvent.REPORT_POST, () => {
        queryClient.invalidateQueries({
          queryKey: ["reportPosts", "infinite"],
          exact: true,
        });
      });
    },
    [queryClient]
  );

  const unsubscribeReportPostEvent = useCallback(
    (connection: HubConnection) => {
      if (!connection) {
        return;
      }
      connection.off(SignalREvent.REPORT_POST);
    },
    []
  );

  return {
    subscribeReportPostEvent,
    unsubscribeReportPostEvent,
  };
};

export { useReportPostSubscription };
