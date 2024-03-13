import { useEffect } from "react";
import { useGlobalState } from "../globalState";
import { HubConnection } from "@microsoft/signalr";
import { GroupMessage } from "@/models";
import { SignalREvent } from "../../data/constants";
import { useQueryClient } from "@tanstack/react-query";

const useGroupMessageSubscription = (connection?: HubConnection) => {
  const queryClient = useQueryClient();
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageType] = useGlobalState("messageType");

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_GROUP_MESSAGE,
      (groupMessage: GroupMessage) => {
        queryClient.invalidateQueries({
          queryKey: [
            "messageList",
            "group",
            groupMessage.groupReceiverId,
            "infinite",
          ],
          exact: true,
        });
        queryClient.invalidateQueries({
          queryKey: ["lastMessageList"],
          exact: true,
        });
      }
    );
    return () => {
      connection.off(SignalREvent.RECEIVE_GROUP_MESSAGE);
    };
  }, [activeConversation, connection, messageType, queryClient]);
};

export default useGroupMessageSubscription;
