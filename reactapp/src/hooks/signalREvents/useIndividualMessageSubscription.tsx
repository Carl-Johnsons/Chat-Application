import { useEffect } from "react";
import { useGlobalState } from "../../globalState";
import { HubConnection } from "@microsoft/signalr";
import { IndividualMessage } from "../../models";
import { SignalREvent } from "../../data/constants";

const useIndividualMessageSubscription = (connection?: HubConnection) => {
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageList, setMessageList] = useGlobalState("messageList");

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.RECEIVE_INDIVIDUAL_MESSAGE, (json: string) => {
      const im: IndividualMessage = JSON.parse(json);
      if (activeConversation !== im.message.senderId) {
        console.log("Not the current active conversation");
        return;
      }
      setMessageList([...(messageList as IndividualMessage[]), im]);
    });
    return () => {
      connection.off(SignalREvent.RECEIVE_INDIVIDUAL_MESSAGE);
    };
  }, [activeConversation, connection, messageList, setMessageList]);
};

export default useIndividualMessageSubscription;
