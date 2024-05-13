import React from "react";
import style from "./Message.container.module.scss";
import Avatar from "@/components/shared/Avatar";

import classNames from "classnames/bind";

import { useGetUser } from "@/hooks/queries/user";
import { ConversationType, Message as MessageModel } from "@/models";
import Message from "../Message";

const cx = classNames.bind(style);

interface Props {
  isSender: boolean;
  conversationType: ConversationType;
  userId: string;
  messageList: MessageModel[];
}

const MessageContainer = ({
  isSender,
  conversationType,
  userId,
  messageList,
}: Props) => {
  const user = useGetUser(userId);
  return (
    <div className={cx("d-flex", "mb-3", isSender && "sender")}>
      {!isSender && conversationType === "Group" && user.data?.avatarUrl && (
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
              key={m.id}
              message={{
                userId: m.senderId,
                content: m.content,
                time: m.time ?? "",
              }}
              sender={isSender}
              showUsername={index === 0}
              id={`message_${m.id}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MessageContainer;
