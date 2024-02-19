import { HTMLProps, memo, useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../../../globalState";

import style from "./ChatViewBody.module.scss";
import classNames from "classnames/bind";
import Message from "../Message";
import Avatar from "../../shared/Avatar";
import images from "../../../assets";
import { GroupMessage, IndividualMessage } from "../../../models";

import useDebounce from "../../../hooks/useDebounce";
import { getNextIndividualMessageList } from "../../../services/individualMessage";
import { getNextGroupMessageList } from "../../../services/groupMessage";

const cx = classNames.bind(style);

const ChatViewBody = (...htmlProp: HTMLProps<HTMLDivElement>[]) => {
  // Transform from array to object
  const mergedProps = Object.assign({}, ...htmlProp);

  const [userId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");
  const [messageList, setMessageList] = useGlobalState("messageList");
  const [messageType] = useGlobalState("messageType");
  const [activeConversation] = useGlobalState("activeConversation");

  const messageContainerRef = useRef(null);
  // For determine whether to keep the original scroll pos or scroll to bottm
  const isFetchNextBatchRef = useRef(false);
  // To check whether the conversation is empty in order not to call API whenever the scroll pos reach the top
  const isConversationEmpty = useRef(false);
  const skipBatchRef = useRef(1);
  const firstOldMessageIdRef = useRef<number | null>();

  // Reset flag variable if change conversation
  useEffect(() => {
    skipBatchRef.current = 1;
    isFetchNextBatchRef.current = false;
    isConversationEmpty.current = false;
  }, [activeConversation, messageType]);

  const fethNextBatch = useCallback(async () => {
    if (!userId || !activeConversation || isConversationEmpty.current) {
      return;
    }
    const skipBatch = skipBatchRef.current;
    let ml: IndividualMessage[] | GroupMessage[] | null = null;
    if (messageType === "Individual") {
      const [data] = await getNextIndividualMessageList(
        userId,
        activeConversation,
        skipBatch
      );
      ml = data;
    } else if (messageType === "Group") {
      const [data] = await getNextGroupMessageList(
        activeConversation,
        skipBatch
      );
      ml = data;
    }
    if (ml === null || ml.length === 0) {
      isConversationEmpty.current = true;
      return;
    }
    const firstOldMessage = messageList[0];
    firstOldMessageIdRef.current = firstOldMessage.messageId;
    isFetchNextBatchRef.current = true;
    skipBatchRef.current = skipBatch + 1;
    setTimeout(() => {
      if (ml === null) {
        return;
      }
      setMessageList([...ml, ...messageList] as
        | GroupMessage[]
        | IndividualMessage[]);
    }, 100);
  }, [activeConversation, messageList, messageType, setMessageList, userId]);

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

  const scrollToLastMessage = () => {

    if (!messageContainerRef.current || isFetchNextBatchRef.current) {
      return;
    }
    const ele = messageContainerRef.current as HTMLElement;
    ele.scrollTop = ele.scrollHeight;
  };
  const scrollToFirstOldMessage = () => {
    if (
      !firstOldMessageIdRef.current ||
      !messageContainerRef.current ||
      !isFetchNextBatchRef.current
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
    isFetchNextBatchRef.current = false;
  };

  useEffect(scrollToLastMessage, [messageList]);
  useEffect(scrollToFirstOldMessage, [messageList]);

  const createMessageItemContainer = useCallback(() => {
    if (!messageList || messageList.length === 0) {
      return;
    }
    let start = messageList[0].message.senderId;
    let startIndex = 0;
    const messageContainers = [];
    // For removing Reactjs key warning
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
        <div
          key={key}
          className={cx(
            "message-item-container",
            "d-flex",
            "mb-3",
            isSender && "sender"
          )}
        >
          {!isSender && messageType === "Group" && (
            <Avatar
              className={cx("rounded-circle", "me-2")}
              src={userMap.get(subArraySenderId)?.avatarUrl ?? images.userIcon}
              alt="avatar"
            />
          )}
          <div
            className={cx(
              "message-list",
              "w-100",
              "d-flex",
              "flex-column",
              isSender ? "align-items-end" : "align-items-start"
            )}
          >
            {subArray.map((im, index) => {
              return (
                <Message
                  key={im.messageId}
                  message={{
                    userId: im.message.senderId,
                    content: im.message.content,
                    time: im.message.time ?? "",
                  }}
                  sender={isSender}
                  showUsername={index === 0}
                  id={`message_${im.message.messageId}`}
                />
              );
            })}
          </div>
        </div>
      );
      key++;
      messageContainers.push(messageContainer);
    }

    return messageContainers;
  }, [messageList, messageType, userId, userMap]);

  return (
    <div ref={messageContainerRef} {...mergedProps}>
      {createMessageItemContainer()}
    </div>
  );
};

export default memo(ChatViewBody);
