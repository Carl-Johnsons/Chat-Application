import { memo, useCallback } from "react";
import { useGlobalState } from "../../globalState";

import style from "./ChatViewBody.module.scss";
import classNames from "classnames/bind";
import Message from "../Message";
import { GroupMessage, IndividualMessage } from "../../models";

const cx = classNames.bind(style);

const ChatViewBody = () => {
  const [userId] = useGlobalState("userId");
  const [messageList] = useGlobalState("messageList");

  const createMessageItemContainer = useCallback(() => {
    if (!messageList || messageList.length === 0) {
      return;
    }
    let start =
      (messageList[0] as IndividualMessage).userReceiverId ??
      (messageList[0] as GroupMessage).groupReceiverId;
    let startIndex = 0;
    const messageContainers = [];
    // For removing Reactjs key warning
    let key = 0;
    for (let i = 1; i <= messageList.length; i++) {
      const receiverId =
        (messageList[i] as IndividualMessage)?.userReceiverId ??
        (messageList[i] as GroupMessage)?.groupReceiverId;

      if (i !== messageList.length && start === receiverId) {
        continue;
      }
      const subArray = messageList.slice(startIndex, i);
      if (i < messageList.length) {
        start = receiverId;
        startIndex = i;
      }
      const isSender =
        userId !== (subArray[0] as IndividualMessage).userReceiverId ??
        (subArray[0] as GroupMessage).groupReceiverId;
      const messageContainer = (
        <div
          key={key}
          className={cx("message-item-container", "mb-3", isSender && "sender")}
        >
          <div
            className={cx(
              "message-list",
              "w-100",
              "d-flex",
              "flex-column",
              isSender ? "align-items-end" : "align-items-start"
            )}
          >
            {subArray.map((im) => (
              <Message
                key={im.messageId}
                name={
                  ((im as IndividualMessage).userReceiverId ??
                    (im as GroupMessage).groupReceiverId) + ""
                }
                content={im.message.content}
                time={im.message.time ?? ""}
                sender={isSender}
              />
            ))}
          </div>
        </div>
      );
      key++;
      messageContainers.push(messageContainer);
    }

    return messageContainers;
  }, [messageList, userId]);

  return <>{createMessageItemContainer()}</>;
};

export default memo(ChatViewBody);
