import React from "react";
import style from "./Message.container.module.scss";
import Avatar from "@/components/shared/Avatar";

import classNames from "classnames/bind";

import { useGetUser } from "@/hooks/queries/user";
import { ConversationType, Message as MessageModel } from "@/models";
import Message from "../Message";
import images from "@/assets";

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
  const user = useGetUser(userId, {
    enabled: !!userId,
  });
  return (
    <div className={cx("d-flex", "mb-3", isSender && "sender")}>
      {!isSender && conversationType === "GROUP" && user.data?.avatarUrl && (
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          src={user.data.avatarUrl || images.defaultAvatarImg.src}
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
              message={m}
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
