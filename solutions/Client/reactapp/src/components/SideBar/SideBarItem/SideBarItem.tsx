import moment from "moment-timezone";
import { useEffect, useState } from "react";
//component
import Avatar from "@/components/shared/Avatar";
//model
import { Conversation, GroupConversation, Message } from "@/models";

import style from "./SideBarItem.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import { useGetCurrentUser, useGetUser } from "@/hooks/queries/user";

const cx = classNames.bind(style);

type ConversationVariant = {
  type: "conversation";
  conversation: Conversation;
  lastMessage?: Message | null;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (conversationId: string) => void;
};
type SearchItemVariant = {
  type: "searchItem";
  userId: string;
  image: string;
  searchName: string;
  phoneNumber: string;
  isActive?: boolean;
  onClick?: (userId: string) => void;
};

type Variants = ConversationVariant | SearchItemVariant;

const SideBarItem = (variant: Variants) => {
  const [descriptionContent, setDescriptionContent] = useState("");
  const [timeContent, setTimeContent] = useState("");

  let userId: string = "";
  let conversation: Conversation | null | undefined;
  let image: string = images.defaultAvatarImg.src;
  let lastMessage: Message | null | undefined;
  let searchName: string = "";
  let phoneNumber: string = "";
  let isActive: boolean | undefined;
  let isNewMessage: boolean | undefined;
  let onClick: ((id: string) => void) | undefined;

  const isConversation = variant.type === "conversation";
  const isSearchItem = variant.type === "searchItem";

  if (isConversation) {
    ({ conversation, isActive, lastMessage, isNewMessage, onClick } = variant);
  } else if (isSearchItem) {
    ({ userId, image, searchName, phoneNumber, isActive, onClick } = variant);
  }
  const { data: currentUserData } = useGetCurrentUser();

  const lastMessageSenderQuery = useGetUser(lastMessage?.senderId ?? "", {
    enabled: !!lastMessage?.senderId,
  });
  const isGroupConversation = conversation?.type === "GROUP";

  // Description
  useEffect(() => {
    if (!isSearchItem && lastMessage) {
      if (!lastMessageSenderQuery.data?.name) {
        setDescriptionContent(`${lastMessage.content}`);
        return;
      }
      const sender =
        currentUserData?.id === lastMessage.senderId
          ? "You: "
          : conversation?.type === "GROUP"
          ? `${lastMessageSenderQuery.data?.name}: `
          : "";
      setDescriptionContent(`${sender}${lastMessage.content}`);
    } else {
      setDescriptionContent(phoneNumber && `Phone Number: ${phoneNumber}`);
    }
  }, [
    conversation?.type,
    currentUserData?.id,
    isSearchItem,
    lastMessage,
    lastMessageSenderQuery.data,
    phoneNumber,
  ]);
  // Time
  useEffect(() => {
    if (!lastMessage || !lastMessage.createdAt) {
      return;
    }
    const d = new Date(lastMessage.createdAt + "");
    const tz = moment.tz.guess();
    const formattedDate = moment(moment(d).tz(tz).format()).fromNow(true);
    setTimeContent(formattedDate);
  }, [lastMessage, lastMessage?.createdAt]);

  const otherUserId = conversation?.users[0]?.userId;

  const { data: otherUserData } = useGetUser(otherUserId ?? "", {
    enabled: !!otherUserId,
  });

  const otherUserAvatar = otherUserData?.avatarUrl ?? images.userIcon.src;
  const otherUserName = otherUserData?.name ?? "";
  const entityAvatar =
    (isConversation
      ? isGroupConversation
        ? (conversation as GroupConversation)?.imageURL
        : otherUserAvatar
      : image) ?? images.userIcon.src;
  const entityName = isConversation
    ? isGroupConversation
      ? (conversation as GroupConversation).name
      : otherUserName
    : searchName;

  return (
    <div
      className={cx(
        "side-bar-item",
        "w-100",
        "position-relative",
        "d-flex",
        isActive && "active",
        isNewMessage && "new-message"
      )}
      role="button"
      onClick={() => {
        if (!onClick) {
          return;
        }
        if (isSearchItem && userId) {
          onClick(userId);
        }
        if (conversation) {
          onClick(conversation.id);
          return;
        }
      }}
    >
      <div
        className={cx(
          "conversation-avatar",
          "d-flex",
          "align-items-center",
          "me-2"
        )}
      >
        <Avatar
          src={entityAvatar}
          avatarClassName={cx("rounded-circle")}
          alt="user avatar"
        />
      </div>
      <div className={cx("item-description", "flex-grow-1")}>
        <div className={cx("item-name-container", "mt-2", "position-relative")}>
          <div
            className={cx(
              "item-name",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {entityName}
          </div>
        </div>
        <div className={cx("description-container", "position-relative")}>
          {/* This container need position absolute to truncate text dynamically based on the parent size */}
          <div
            className={cx(
              "description",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {descriptionContent}
          </div>
        </div>
      </div>
      {!isSearchItem && (
        <>
          <div
            className={cx(
              "time",
              "mt-1",
              "me-1",
              "position-absolute",
              "end-0",
              "top-0"
            )}
          >
            {timeContent}
          </div>
          <div
            className={cx(
              "red-dot",
              "rounded-circle",
              "position-absolute",
              "end-0",
              "bottom-0",
              "d-flex",
              "justify-content-center",
              "align-items-center",
              "text-white",
              isNewMessage ? "" : "d-none"
            )}
          >
            1
          </div>
        </>
      )}
    </div>
  );
};

export default SideBarItem;
