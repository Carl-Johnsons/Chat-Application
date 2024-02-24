import { useEffect } from "react";
import { useGlobalState } from "../globalState";
import { HubConnection } from "@microsoft/signalr";
import { GroupMessage, IndividualMessage } from "@/models";
import { useSortableArray } from "@/hooks";
import { SignalREvent } from "../../data/constants";

const useGroupMessageSubscription = (connection?: HubConnection) => {
  const [lastMessageList, setLastMessageList] =
    useGlobalState("lastMessageList");
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageList, setMessageList] = useGlobalState("messageList");
  const [messageType] = useGlobalState("messageType");

  const [moveMessageToTop] = useSortableArray<IndividualMessage | GroupMessage>(
    lastMessageList,
    setLastMessageList as React.Dispatch<
      React.SetStateAction<(IndividualMessage | GroupMessage)[]>
    >
  );
  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on(
      SignalREvent.RECEIVE_GROUP_MESSAGE,
      (groupMessage: GroupMessage) => {
        if (
          messageType === "Group" &&
          activeConversation === groupMessage.groupReceiverId
        ) {
          setMessageList([...(messageList as GroupMessage[]), groupMessage]);
        }
        //Update last message
        const indexToUpdate = lastMessageList.findIndex((messageObj, index) => {
          if (messageObj.message.messageType === "Individual") {
            return false;
          }
          const gm = lastMessageList[index] as GroupMessage;
          return groupMessage.groupReceiverId === gm.groupReceiverId;
        });
        console.log({ indexToUpdate });
        if (indexToUpdate !== -1) {
          lastMessageList[indexToUpdate] = groupMessage;
          moveMessageToTop(indexToUpdate);
        }
      }
    );
    return () => {
      connection.off(SignalREvent.RECEIVE_GROUP_MESSAGE);
    };
  }, [
    activeConversation,
    connection,
    lastMessageList,
    messageList,
    messageType,
    moveMessageToTop,
    setMessageList,
  ]);
};

export default useGroupMessageSubscription;
