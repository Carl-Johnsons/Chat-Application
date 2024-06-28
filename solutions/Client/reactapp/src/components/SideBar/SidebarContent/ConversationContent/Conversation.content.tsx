import { useCallback, useState } from "react";

import SideBarItem from "../../SideBarItem";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { ConversationType, Message } from "@/models";
import {
  useGetInfiniteMessageList,
  useGetLastMessages,
} from "@/hooks/queries/message";
import { useGetConversationList } from "@/hooks/queries/conversation";

const ConversationContent = () => {
  const [, setConversationType] = useGlobalState("conversationType");
  const [activeConversationId, setActiveConversationId] = useGlobalState(
    "activeConversationId"
  );

  const { handleClickScreenSection } = useScreenSectionNavigator();

  const [enableMessageListQuery, setEnableMessageListQuery] = useState(false);
  const messageListQuery = useGetInfiniteMessageList(activeConversationId, {
    enabled: enableMessageListQuery,
  });
  const { data: conversationResponse } = useGetConversationList();
  const conversationsId =
    conversationResponse?.conversations?.flatMap((c) => c.id) ?? [];

  const lastMessageQueries = useGetLastMessages(conversationsId, {
    enabled: conversationsId.length > 0,
  });

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
      {conversationResponse?.conversations &&
        (conversationResponse.conversations ?? []).map(
          (conversation, index) => {
            if (!conversation) {
              return;
            }
            const lastMessage: Partial<Message> = lastMessageQueries[index]
              .data ?? {
              content: "This conversation is new! Say hi",
            };

            return (
              <SideBarItem
                key={conversation.id}
                type="conversation"
                conversation={conversation}
                lastMessage={lastMessage}
                onClick={(conversationId) =>
                  handleClickConversation(conversationId, conversation.type)
                }
                isActive={activeConversationId === conversation.id}
              />
            );
          }
        )}
      {conversationResponse?.groupConversations &&
        (conversationResponse.groupConversations ?? []).map(
          (conversation, index) => {
            if (!conversation) {
              return;
            }
            const lastMessage: Partial<Message> = lastMessageQueries[index]
              .data ?? {
              content: "This conversation is new! Say hi",
            };

            return (
              <SideBarItem
                key={conversation.id}
                type="groupConversation"
                conversation={conversation}
                lastMessage={lastMessage}
                onClick={(conversationId) =>
                  handleClickConversation(conversationId, conversation.type)
                }
                isActive={activeConversationId === conversation.id}
              />
            );
          }
        )}
    </>
  );
};

export default ConversationContent;
