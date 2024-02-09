import { useEffect } from "react";
import { useGlobalState } from "../../globalState";
import { HubConnection } from "@microsoft/signalr";
import { IndividualMessage } from "../../models";

const useIndividualMessageSubscription = (connection?: HubConnection) => {
  const [activeConversation] = useGlobalState("activeConversation");
  const [individualMessageList, setIndividualMessageList] = useGlobalState(
    "individualMessageList"
  );

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("ReceiveIndividualMessage", (json: string) => {
      const im: IndividualMessage = JSON.parse(json);
      if (activeConversation !== im.message.senderId) {
        console.log("Not the current active conversation");
        return;
      }
      setIndividualMessageList([...individualMessageList, im]);
      console.log({ im });
    });
    return () => {
      connection.off("ReceiveIndividualMessage");
    };
  }, [
    activeConversation,
    connection,
    individualMessageList,
    setIndividualMessageList,
  ]);
};

export default useIndividualMessageSubscription;
