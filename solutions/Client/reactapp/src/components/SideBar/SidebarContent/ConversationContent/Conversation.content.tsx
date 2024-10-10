import { useCallback, useState } from "react";

import SideBarItem from "../../SideBarItem";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { ConversationType, Message } from "@/models";
import { useGetInfiniteMessageList } from "@/hooks/queries/message";
import { useGetConversationList } from "@/hooks/queries/conversation";
import { AppLoading } from "@/components/shared";

const ConversationContent = () => {
  const [, setConversationType] = useGlobalState("conversationType");
  const [activeConversationId, setActiveConversationId] = useGlobalState(
    "activeConversationId"
  );

  const { handleClickScreenSection } = useScreenSectionNavigator();

  const [enableMessageListQuery, setEnableMessageListQuery] = useState(false);
  const messageListQuery = useGetInfiniteMessageList(activeConversationId, {
    enabled: enableMessageListQuery && !!activeConversationId,
  });
  const { data: conversationResponse, isLoading } = useGetConversationList();

  const handleClickConversation = useCallback(
    (conversationId: string, type: ConversationType) => {
      handleClickScreenSection(false);
      setActiveConversationId(conversationId);
      setConversationType(type);
      setEnableMessageListQuery(true);
      messageListQuery.refetch();
    },
    [
      handleClickScreenSection,
      messageListQuery,
      setActiveConversationId,
      setConversationType,
    ]
  );
  // useEffect(() => {
  //   if (!friendList || friendList.length === 0 || activeConversationId !== 0) {
  //     return;
  //   }
  //   //Initial with the first friend in the list
  //   handleClickConversation(friendList[0].friendNavigation.userId);
  // }, [friendList, handleClickConversation, activeConversationId]);

  return (
    <>
      {isLoading ? (
        <AppLoading></AppLoading>
      ) : (
        <>
          {conversationResponse?.conversations &&
            (conversationResponse.conversations ?? []).map((conversation) => {
              if (!conversation) {
                return;
              }
              const { id, type, lastMessage } = conversation;
              const message: Partial<Message> = lastMessage ?? {
                content: "This conversation is new! Say hi",
              };
              if (type == "INDIVIDUAL") {
                return (
                  <SideBarItem
                    key={id}
                    type="conversation"
                    conversation={conversation}
                    lastMessage={message}
                    onClick={() => handleClickConversation(id, type)}
                    isActive={activeConversationId === id}
                  />
                );
              } else {
                return (
                  <SideBarItem
                    key={id}
                    type="groupConversation"
                    conversation={conversation}
                    lastMessage={message}
                    onClick={() => handleClickConversation(id, type)}
                    isActive={activeConversationId === id}
                  />
                );
              }
            })}
        </>
      )}
    </>
  );
};

export default ConversationContent;
