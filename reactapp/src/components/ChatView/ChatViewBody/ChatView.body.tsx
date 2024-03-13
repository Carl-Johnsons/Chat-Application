import { HTMLProps, memo, useCallback, useEffect, useRef } from "react";

import { useDebounce, useGlobalState } from "@/hooks";

import {
  useGetInfiniteGMList,
  useGetInfiniteIMList,
} from "@/hooks/queries/message";
import { useGetCurrentUser } from "@/hooks/queries/user";
import MessageContainer from "../MessageContainer";

const ChatViewBody = (...htmlProp: HTMLProps<HTMLDivElement>[]) => {
  // Transform from array to object
  const mergedProps = Object.assign({}, ...htmlProp);

  const [messageType] = useGlobalState("messageType");
  const [activeConversation] = useGlobalState("activeConversation");

  const messageContainerRef = useRef(null);
  const firstOldMessageIdRef = useRef<number | null>();
  const isLoadingMessageRef = useRef<boolean>(false);
  const prevActiveConversationRef = useRef<number>(-1);

  const {
    data: infiniteIMList,
    fetchNextPage: fetchNextIMList,
    isLoading: isLoadingNextIMList,
  } = useGetInfiniteIMList(activeConversation, messageType === "Individual");
  const {
    data: infiniteGMList,
    fetchNextPage: fetchNextGMList,
    isLoading: isLoadingNextGMList,
  } = useGetInfiniteGMList(activeConversation, messageType === "Group");

  const IMListdata = [...(infiniteIMList?.pages ?? [])]
    .reverse() // reverse function mutate the orginal array which is messed the useInfinite query, so creating a new array is needed
    .flatMap((page) => page.data);
  const GMListdata = [...(infiniteGMList?.pages ?? [])]
    .reverse()
    .flatMap((page) => page.data);

  const messageList = messageType === "Individual" ? IMListdata : GMListdata;
  const prevValuesRef = useRef({
    activeConversation: activeConversation,
    messageListLength: messageList.length,
    firstOldMessageId: firstOldMessageIdRef.current,
  });
  isLoadingMessageRef.current = isLoadingNextIMList && isLoadingNextGMList;

  const currentUserQuery = useGetCurrentUser();
  const userId = currentUserQuery.data?.userId ?? -1;

  const fethNextBatch = useCallback(async () => {
    if (!activeConversation || !messageList) {
      return;
    }
    //Save the first message before fetch new message
    if (!isLoadingMessageRef.current && messageList[0]) {
      const firstOldMessage = messageList[0];
      console.log({ firstOldMessage });
      firstOldMessageIdRef.current = firstOldMessage.messageId;
    }
    if (messageType === "Individual") {
      fetchNextIMList();
    } else if (messageType === "Group") {
      fetchNextGMList();
    }
  }, [
    activeConversation,
    fetchNextGMList,
    fetchNextIMList,
    messageList,
    messageType,
  ]);

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
    console.log("Call scroll last message");
    if (
      !messageContainerRef.current ||
      prevActiveConversationRef.current === activeConversation ||
      messageList.length === 0
    ) {
      return;
    }
    const ele = messageContainerRef.current as HTMLElement;
    ele.scrollTop = ele.scrollHeight;
    prevActiveConversationRef.current = activeConversation;
    console.log("scroll to last message");
  }, [activeConversation, messageList.length]);

  const scrollToFirstOldMessage = useCallback(() => {
    if (
      !firstOldMessageIdRef.current ||
      !messageContainerRef.current ||
      prevActiveConversationRef.current !== activeConversation
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
    console.log("scroll to first old message");
  }, [activeConversation]);

  const scrollToMessage = () => {
    const shouldScroll =
      activeConversation !== prevValuesRef.current.activeConversation ||
      messageList.length !== prevValuesRef.current.messageListLength ||
      firstOldMessageIdRef.current !== prevValuesRef.current.firstOldMessageId;
    if (shouldScroll) {
      scrollToLastMessage();
      scrollToFirstOldMessage();
    }

    prevValuesRef.current = {
      activeConversation: activeConversation,
      messageListLength: messageList.length,
      firstOldMessageId: firstOldMessageIdRef.current,
    };
  };

  useEffect(scrollToMessage, [
    activeConversation,
    messageList.length,
    scrollToFirstOldMessage,
    scrollToLastMessage,
  ]);

  const createMessageItemContainer = useCallback(() => {
    if (!messageList || (messageList && messageList.length === 0)) {
      return;
    }
    let start = messageList[0].message.senderId;
    let startIndex = 0;
    const messageContainers = [];
    let key = 0;
    for (let i = 1; i <= messageList.length; i++) {
      const senderId = messageList[i]?.message.senderId;

      if (i !== messageList.length && start === senderId) {
        continue;
      }
      const subArray = messageList.slice(startIndex, i);
      if (i < messageList.length) {
        start = senderId;
        startIndex = i;
      }
      const subArraySenderId = subArray[0].message.senderId;
      const isSender = userId === subArraySenderId;

      const messageContainer = (
        <MessageContainer
          key={key}
          isSender={isSender}
          messageType={messageType}
          userId={subArraySenderId}
          messageList={subArray}
        ></MessageContainer>
      );
      messageContainers.push(messageContainer);
      key++;
    }

    return messageContainers;
  }, [messageList, messageType, userId]);

  return (
    <div ref={messageContainerRef} {...mergedProps}>
      {createMessageItemContainer()}
    </div>
  );
};

export default memo(ChatViewBody);
