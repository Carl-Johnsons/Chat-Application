import { useCallback, useState } from "react";

import SideBarItem from "../../SideBarItem";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { ConversationType } from "@/models";
import {
  useGetInfiniteMessageList,
  useGetLastMessages,
} from "@/hooks/queries/message";
import {
  useGetConversationUsers,
  useGetConversations,
} from "@/hooks/queries/conversation";

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
  const { data: conversationUsersData } = useGetConversationUsers();
  const conversationsId =
    conversationUsersData?.flatMap((cu) => cu.conversationId) ?? [];
  const conversationQueries = useGetConversations(conversationsId, {
    enabled: conversationsId.length > 0,
  });
  const lastMessageQueries = useGetLastMessages(conversationsId, {
    enabled: conversationsId.length > 0,
  });

  const handleClickConversation = useCallback(
    (conversationId: number, type: ConversationType) => {
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
      {conversationQueries &&
        (conversationQueries ?? []).map((query, index) => {
          if (query.isLoading) {
            return;
          }
          const conversation = query.data;
          const lastMessage = lastMessageQueries[index].data ?? undefined;

          if (!conversation) {
            return;
          }

          return (
            <SideBarItem
              key={conversation.id}
              type="conversation"
              lastMessage={lastMessage}
              conversationId={conversation.id ?? -1}
              onClick={(conversationId) =>
                handleClickConversation(conversationId, conversation.type)
              }
              isActive={activeConversationId === conversation.id}
            />
          );
        })}
    </>
  );
};

export default ConversationContent;
