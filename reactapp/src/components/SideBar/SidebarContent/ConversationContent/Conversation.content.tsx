import { useCallback, useState } from "react";

import SideBarItem from "../../SideBarItem";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { GroupMessage, IndividualMessage, MessageType } from "@/models";
import {
  useGetLastMessageList,
  useGetMessageList,
} from "@/hooks/queries/message";
import { useGetCurrentUser } from "@/hooks/queries/user";

const ConversationContent = () => {
  const [messageType, setMessageType] = useGlobalState("messageType");
  const [activeConversation, setActiveConversation] =
    useGlobalState("activeConversation");

  const { handleClickScreenSection } = useScreenSectionNavigator();

  const [enableMessageListQuery, setEnableMessageListQuery] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  const messageListQuery = useGetMessageList(
    activeConversation,
    messageType,
    enableMessageListQuery
  );
  const handleClickConversation = useCallback(
    (receiverId: number, type: MessageType) => {
      handleClickScreenSection(false);
      setActiveConversation(receiverId);
      setMessageType(type);
      setEnableMessageListQuery(true);
      messageListQuery.refetch();
    },
    [
      handleClickScreenSection,
      messageListQuery,
      setActiveConversation,
      setMessageType,
    ]
  );

  const lastMessageListQuery = useGetLastMessageList();

  // useEffect(() => {
  //   if (!friendList || friendList.length === 0 || activeConversation !== 0) {
  //     return;
  //   }
  //   //Initial with the first friend in the list
  //   handleClickConversation(friendList[0].friendNavigation.userId);
  // }, [friendList, handleClickConversation, activeConversation]);
  return (
    <>
      {lastMessageListQuery.data &&
        (lastMessageListQuery.data ?? []).map((m) => {
          if (!currentUser) {
            return;
          }
          if (m.message.messageType === "Group") {
            const { groupReceiverId, message } = m as GroupMessage;

            return (
              <SideBarItem
                key={message.messageId}
                type="groupConversation"
                lastMessage={message}
                groupId={groupReceiverId}
                onClick={handleClickConversation}
                isActive={
                  activeConversation === groupReceiverId &&
                  messageType == "Group"
                }
              />
            );
          }
          const { userReceiverId, message } = m as IndividualMessage;
          const otherUserId =
            userReceiverId === currentUser.userId
              ? message.senderId
              : userReceiverId;
          return (
            <SideBarItem
              key={message.messageId}
              type="individualConversation"
              userId={otherUserId}
              lastMessage={message}
              onClick={handleClickConversation}
              isActive={
                activeConversation === otherUserId &&
                messageType == "Individual"
              }
            />
          );
        })}
    </>
  );
};

export default ConversationContent;
