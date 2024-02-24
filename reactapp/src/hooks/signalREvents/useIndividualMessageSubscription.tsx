import { useEffect } from "react";
import { useGlobalState } from "../globalState";
import { HubConnection } from "@microsoft/signalr";
import { GroupMessage, IndividualMessage } from "@/models";
import { useSortableArray } from "@/hooks";
import { SignalREvent } from "../../data/constants";

const useIndividualMessageSubscription = (connection?: HubConnection) => {
  const [lastMessageList, setLastMessageList] =
    useGlobalState("lastMessageList");
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageList, setMessageList] = useGlobalState("messageList");

  const [moveMessageToTop] = useSortableArray<IndividualMessage | GroupMessage>(
    lastMessageList,
    setLastMessageList as React.Dispatch<
      React.SetStateAction<(IndividualMessage | GroupMessage)[]>
    >
  );
  // This message is still not real-time
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(SignalREvent.RECEIVE_INDIVIDUAL_MESSAGE, (json: string) => {
      console.log("Run event");
      console.log({ json });

      const newIm: IndividualMessage = JSON.parse(json);
      if (activeConversation === newIm.message.senderId) {
        setMessageList([...(messageList as IndividualMessage[]), newIm]);
      }
      //Update last message
      const indexToUpdate = lastMessageList.findIndex((messageObj, index) => {
        if (messageObj.message.messageType === "Group") {
          return false;
        }
        const im = lastMessageList[index] as IndividualMessage;
        return (
          (newIm.message.senderId === im.message.senderId &&
            newIm.userReceiverId === im.userReceiverId) ||
          (newIm.userReceiverId === im.message.senderId &&
            newIm.message.senderId === im.userReceiverId)
        );
      });
      console.log({ indexToUpdate });
      if (indexToUpdate !== -1) {
        lastMessageList[indexToUpdate] = newIm;
        moveMessageToTop(indexToUpdate);
      }
    });
    return () => {
      connection.off(SignalREvent.RECEIVE_INDIVIDUAL_MESSAGE);
    };
  }, [
    activeConversation,
    connection,
    lastMessageList,
    messageList,
    moveMessageToTop,
    setMessageList,
  ]);
};

export default useIndividualMessageSubscription;
