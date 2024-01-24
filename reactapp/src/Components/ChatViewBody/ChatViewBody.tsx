import { memo, useCallback } from "react";
import { useGlobalState } from "../../GlobalState";

import style from "./ChatViewBody.module.scss";
import classNames from "classnames/bind";
import Message from "../Message";

const cx = classNames.bind(style);

const ChatViewBody = () => {
  const [userId] = useGlobalState("userId");
  const [individualMessages] = useGlobalState("individualMessageList");

  const createMessageItemContainer = useCallback(() => {
    if (!individualMessages || individualMessages.length === 0) {
      return;
    }

    let start = individualMessages[0].userReceiverId;
    let startIndex = 0;
    const messageContainers = [];
    // For removing Reactjs key warning
    let key = 0;
    for (let i = 1; i <= individualMessages.length; i++) {
      if (
        i !== individualMessages.length &&
        start === individualMessages[i].userReceiverId
      ) {
        continue;
      }
      const subArray = individualMessages.slice(startIndex, i);
      if (i < individualMessages.length) {
        start = individualMessages[i].userReceiverId;
        startIndex = i;
      }
      const isSender = userId !== subArray[0].userReceiverId;
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
                name={im.userReceiverId + ""}
                content={im.message.content}
                time={im.message.time}
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
  }, [individualMessages, userId]);

  return <>{createMessageItemContainer()}</>;
};

export default memo(ChatViewBody);
