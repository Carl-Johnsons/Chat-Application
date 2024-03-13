import moment from "moment";
import { useEffect, useState } from "react";
//component
import Avatar from "@/components/shared/Avatar";
//model
import { Message, MessageType } from "@/models";

import style from "./SideBarItem.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import { useGetGroup } from "@/hooks/queries/group";
import { useGetCurrentUser, useGetUser } from "@/hooks/queries/user";

const cx = classNames.bind(style);

type GroupConversationVariant = {
  type: "groupConversation";
  groupId: number;
  lastMessage?: Message;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (groupId: number, type: MessageType) => void;
};
type IndividualConversationVariant = {
  type: "individualConversation";
  userId: number;
  lastMessage?: Message;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (userId: number, type: MessageType) => void;
};
type SearchItemVariant = {
  type: "searchItem";
  userId: number;
  image: string;
  searchName: string;
  phoneNumber: string;
  isActive?: boolean;
  onClick?: (userId: number) => void;
};

type Variants =
  | IndividualConversationVariant
  | SearchItemVariant
  | GroupConversationVariant;

const SideBarItem = (variant: Variants) => {
  const [descriptionContent, setDescriptionContent] = useState("");
  const [timeContent, setTimeContent] = useState("");

  let userId: number = 0;
  let groupId: number = 0;
  let image: string = images.defaultAvatarImg.src;
  let lastMessage: Message | undefined;
  let searchName: string = "";
  let phoneNumber: string = "";
  let isActive: boolean | undefined;
  let isNewMessage: boolean | undefined;
  let onClick: ((id: number, type: MessageType) => void) | undefined;

  const isIndividualConversation = variant.type === "individualConversation";
  const isSearchItem = variant.type === "searchItem";
  const isGroupConversation = variant.type === "groupConversation";

  if (isIndividualConversation) {
    ({ userId, isActive, lastMessage, isNewMessage, onClick } = variant);
  } else if (isSearchItem) {
    ({ userId, image, searchName, phoneNumber, isActive, onClick } = variant);
  } else if (isGroupConversation) {
    ({ groupId, isActive, lastMessage, isNewMessage, onClick } = variant);
  }
  const currentUserQuery = useGetCurrentUser();
  const userQuery = useGetUser(userId);
  const groupQuery = useGetGroup(groupId);
  const lastMessageSenderQuery = useGetUser(lastMessage?.senderId ?? -1);
  
  // Description
  useEffect(() => {
    if (!isSearchItem && lastMessage) {
      if (!lastMessageSenderQuery.data?.name) {
        return;
      }
      const sender =
        currentUserQuery.data?.userId === lastMessage.senderId
          ? "You: "
          : isGroupConversation
          ? `${lastMessageSenderQuery.data?.name}: `
          : "";
      setDescriptionContent(`${sender}${lastMessage.content}`);
    } else {
      setDescriptionContent(phoneNumber && `Phone Number: ${phoneNumber}`);
    }
  }, [
    currentUserQuery.data,
    isGroupConversation,
    isSearchItem,
    lastMessage,
    lastMessageSenderQuery.data,
    phoneNumber,
  ]);
  // Time
  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    const d = new Date(lastMessage.time + "");
    const formattedDate = moment(d).fromNow(true);
    setTimeContent(formattedDate);
  }, [lastMessage, lastMessage?.time]);

  const entityAvatar = isIndividualConversation
    ? userQuery.data?.avatarUrl
    : isGroupConversation
    ? groupQuery.data?.groupAvatarUrl
    : undefined;

  const entityName = isIndividualConversation
    ? userQuery.data?.name
    : isGroupConversation
    ? groupQuery.data?.groupName
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
        if (userId) {
          onClick(userId, "Individual");
          return;
        }
        if (groupId) {
          onClick(groupId, "Group");
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
          src={isSearchItem ? image : entityAvatar ?? ""}
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
