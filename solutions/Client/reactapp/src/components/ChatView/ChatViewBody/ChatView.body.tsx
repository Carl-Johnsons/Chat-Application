import { HTMLProps, memo, useCallback, useEffect, useRef } from "react";

import { useDebounce, useGlobalState } from "@/hooks";

import { useGetInfiniteMessageList } from "@/hooks/queries/message";
import { useGetCurrentUser } from "@/hooks/queries/user";
import MessageContainer from "../MessageContainer";

const ChatViewBody = (...htmlProp: HTMLProps<HTMLDivElement>[]) => {
  // Transform from array to object
  const mergedProps = Object.assign({}, ...htmlProp);

  const [conversationType] = useGlobalState("conversationType");
  const [activeConversationId] = useGlobalState("activeConversationId");

  const messageContainerRef = useRef(null);
  const firstOldMessageIdRef = useRef<string | null>();
  const prevActiveConversationRef = useRef<string>();

  const {
    data: infiniteML,
    fetchNextPage: fetchNextML,
    isLoading: isLoadingNextML,
  } = useGetInfiniteMessageList(activeConversationId, {
    enabled: !!activeConversationId,
  });

  const messageList = [...(infiniteML?.pages ?? [])]
    .reverse() // reverse function mutate the original array which is messed the useInfinite query, so creating a new array is needed
    .flatMap((page) => page.data.paginatedData);

  const prevValuesRef = useRef({
    activeConversationId: activeConversationId,
    messageListLength: messageList.length,
    firstOldMessageId: firstOldMessageIdRef.current,
  });

  const currentUserQuery = useGetCurrentUser();
  const userId = currentUserQuery.data?.id ?? -1;

  const fethNextBatch = useCallback(async () => {
    if (!activeConversationId || !messageList) {
      return;
    }
    //Save the first message before fetch new message
    if (!isLoadingNextML && messageList[0]) {
      const firstOldMessage = messageList[0];
      firstOldMessageIdRef.current = firstOldMessage.id;
    }
    fetchNextML();
  }, [activeConversationId, fetchNextML, isLoadingNextML, messageList]);

  const debounceFetchData = useDebounce(fethNextBatch, 100);

  const onScroll = useCallback(() => {
    if (!messageContainerRef.current) {
      return;
    }
    const { scrollTop } = messageContainerRef.current as HTMLElement;
    const isNearTop = Math.round(scrollTop) < 1;
    if (isNearTop) {
      debounceFetchData();
    }
  }, [debounceFetchData]);

  useEffect(() => {
    if (!messageContainerRef.current) {
      return;
    }
    const ele = messageContainerRef.current as HTMLElement;
    ele.addEventListener("scroll", onScroll);

    return () => {
      ele.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  const scrollToLastMessage = useCallback(() => {
    if (
      !messageContainerRef.current ||
      prevActiveConversationRef.current === activeConversationId ||
      messageList.length === 0
    ) {
      return;
    }
    const ele = messageContainerRef.current as HTMLElement;
    ele.scrollTop = ele.scrollHeight;
    prevActiveConversationRef.current = activeConversationId;
  }, [activeConversationId, messageList.length]);

  const scrollToFirstOldMessage = useCallback(() => {
    if (
      !firstOldMessageIdRef.current ||
      !messageContainerRef.current ||
      prevActiveConversationRef.current !== activeConversationId
    ) {
      return;
    }
    const containerEle = messageContainerRef.current as HTMLElement;
    const ele = document.getElementById(
      `message_${firstOldMessageIdRef.current}`
    );
    if (!ele) {
      return;
    }
    containerEle.scrollTop = ele.offsetTop - 20;
  }, [activeConversationId]);

  const scrollToMessage = () => {
    const shouldScroll =
      activeConversationId !== prevValuesRef.current.activeConversationId ||
      messageList.length !== prevValuesRef.current.messageListLength ||
      firstOldMessageIdRef.current !== prevValuesRef.current.firstOldMessageId;
    if (shouldScroll) {
      scrollToLastMessage();
      scrollToFirstOldMessage();
    }

    prevValuesRef.current = {
      activeConversationId: activeConversationId,
      messageListLength: messageList.length,
      firstOldMessageId: firstOldMessageIdRef.current,
    };
  };

  useEffect(scrollToMessage, [
    activeConversationId,
    messageList.length,
    scrollToFirstOldMessage,
    scrollToLastMessage,
  ]);

  const createMessageItemContainer = useCallback(() => {
    if (!messageList || (messageList && messageList.length === 0)) {
      return;
    }

    let start = messageList[0].senderId;
    let startIndex = 0;
    const messageContainers = [];
    let key = 0;
    for (let i = 1; i <= messageList.length; i++) {
      const senderId = messageList[i]?.senderId;

      if (i !== messageList.length && start === senderId) {
        continue;
      }
      const subArray = messageList.slice(startIndex, i);
      if (i < messageList.length) {
        start = senderId;
        startIndex = i;
      }
      const subArraySenderId = subArray[0].senderId;
      const isSender = userId === subArraySenderId;

      const messageContainer = (
        <MessageContainer
          key={key}
          isSender={isSender}
          conversationType={conversationType}
          userId={subArraySenderId}
          messageList={subArray}
        ></MessageContainer>
      );
      messageContainers.push(messageContainer);
      key++;
    }

    return messageContainers;
  }, [conversationType, messageList, userId]);

  if (!activeConversationId) {
    return;
  }

  return (
    <div ref={messageContainerRef} {...mergedProps}>
      {createMessageItemContainer()}
    </div>
  );
};

export default memo(ChatViewBody);
