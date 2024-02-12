import images from "../../assets";
import { MessageType } from "../../models";
import Avatar from "../Avatar";
import style from "./SideBarItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

type GroupConversationVariant = {
  type: "groupConversation";
  groupId: number;
  image: string;
  conversationName: string;
  lastMessage?: string;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (groupId: number, type: MessageType) => void;
};
type ConversationVariant = {
  type: "conversation";
  userId: number;
  image: string;
  conversationName: string;
  lastMessage?: string;
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
  | ConversationVariant
  | SearchItemVariant
  | GroupConversationVariant;

const SideBarItem = (variant: Variants) => {
  let userId: number = 0;
  let groupId: number = 0;
  let image: string = images.defaultAvatarImg;
  let conversationName: string = "";
  let searchName: string = "";
  let phoneNumber: string = "";
  let isActive: boolean | undefined;
  let lastMessage: string | undefined;
  let isNewMessage: boolean | undefined;
  let onClick: ((id: number, type: MessageType) => void) | undefined;

  if (variant.type === "conversation") {
    ({
      userId,
      image,
      conversationName,
      lastMessage,
      isActive,
      isNewMessage,
      onClick,
    } = variant);
  } else if (variant.type === "searchItem") {
    ({ userId, image, searchName, phoneNumber, isActive, onClick } = variant);
  } else if (variant.type === "groupConversation") {
    ({
      groupId,
      image,
      conversationName,
      lastMessage,
      isActive,
      isNewMessage,
      onClick,
    } = variant);
  }
  return (
    <div
      className={cx(
        "conversation",
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
          src={image}
          className={cx("rounded-circle")}
          alt="user avatar"
        />
      </div>
      <div className={cx("conversation-description", "flex-grow-1")}>
        <div
          className={cx(
            "conversation-name-container",
            "mt-2",
            "position-relative"
          )}
        >
          <div
            className={cx(
              "conversation-name",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {variant.type === "conversation" ||
            variant.type === "groupConversation"
              ? conversationName
              : searchName}
          </div>
        </div>
        <div
          className={cx(
            "conversation-last-message-container",
            "position-relative"
          )}
        >
          {/* This container need position absolute to truncate text dynamically based on the parent size */}
          <div
            className={cx(
              "conversation-last-message",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {lastMessage
              ? `Last Message: ${lastMessage}`
              : phoneNumber && `Phone Number: ${phoneNumber}`}
          </div>
        </div>
      </div>
      {variant.type === "conversation" && (
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
            Hôm qua
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
