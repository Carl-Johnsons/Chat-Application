import images from "../../assets";
import Avatar from "../Avatar";
import style from "./SideBarItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

type ConversationVariant = {
  type: "conversation";
  userId: number;
  image: string;
  conversationName: string;
  lastMessage?: string;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (userId: number) => void;
};
type SearchItemVariant = {
  type: "searchItem";
  userId: number;
  image: string;
  conversationName: string;
  phoneNumber: string;
  isActive?: boolean;
  onClick?: (userId: number) => void;
};

type Variants = ConversationVariant | SearchItemVariant;

const SideBarItem = (variant: Variants) => {
  let userId: number = 0;
  let image: string = images.defaultAvatarImg;
  let conversationName: string = "";
  let phoneNumber: string = "";
  let isActive: boolean | undefined;
  let lastMessage: string | undefined;
  let isNewMessage: boolean | undefined;
  let onClick: ((userId: number) => void) | undefined;

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
    ({ userId, image, conversationName, phoneNumber, isActive, onClick } =
      variant);
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
        if (onClick) {
          onClick(userId);
        }
        return;
      }}
      data-user-id={userId}
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
            {conversationName}
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
