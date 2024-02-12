import { memo, useCallback } from "react";
import { useGlobalState } from "../../globalState";

import style from "./ChatViewBody.module.scss";
import classNames from "classnames/bind";
import Message from "../Message";
import Avatar from "../Avatar";
import images from "../../assets";

const cx = classNames.bind(style);

const ChatViewBody = () => {
  const [userId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");
  const [messageList] = useGlobalState("messageList");
  const [messageType] = useGlobalState("messageType");

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
                  userId={im.message.senderId}
                  content={im.message.content}
                  time={im.message.time ?? ""}
                  sender={isSender}
                  showUsername={index === 0}
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
  }, [messageList, userId]);

  return <>{createMessageItemContainer()}</>;
};

export default memo(ChatViewBody);
