import { useEffect } from "react";
import { useGlobalState } from "../globalState";
import { HubConnection } from "@microsoft/signalr";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useIndividualMessageSubscription = (connection?: HubConnection) => {
  const [activeConversation] = useGlobalState("activeConversation");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!connection) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connection.on(SignalREvent.RECEIVE_INDIVIDUAL_MESSAGE, (_json: string) => {
      queryClient.invalidateQueries({
        queryKey: ["messageList", "individual", activeConversation, "infinite"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["lastMessageList"],
        exact: true,
      });
    });
    return () => {
      connection.off(SignalREvent.RECEIVE_INDIVIDUAL_MESSAGE);
    };
  }, [activeConversation, connection, queryClient]);
};

export default useIndividualMessageSubscription;
