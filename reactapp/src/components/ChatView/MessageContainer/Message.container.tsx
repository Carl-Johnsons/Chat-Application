import React from "react";
import style from "./Message.container.module.scss";
import Avatar from "@/components/shared/Avatar";

import classNames from "classnames/bind";
import { MessageType } from "models/MessageType";
import { useGetUser } from "hooks/queries/user/useGetUser.query";
import { IndividualMessage } from "models/IndividualMessage";
import { GroupMessage } from "models/GroupMessage";
import Message from "../Message";

const cx = classNames.bind(style);

interface Props {
  isSender: boolean;
  messageType: MessageType;
  userId: number;
  messageList: IndividualMessage[] | GroupMessage[];
}

const MessageContainer = ({
  isSender,
  messageType,
  userId,
  messageList,
}: Props) => {
  const user = useGetUser(userId);
  return (
    <div className={cx("d-flex", "mb-3", isSender && "sender")}>
      {!isSender && messageType === "Group" && user.data?.avatarUrl && (
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          src={user.data.avatarUrl}
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
        {messageList.map((m, index) => {
          return (
            <Message
              key={m.messageId}
              message={{
                userId: m.message.senderId,
                content: m.message.content,
                time: m.message.time ?? "",
              }}
              sender={isSender}
              showUsername={index === 0}
              id={`message_${m.message.messageId}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageContainer;
