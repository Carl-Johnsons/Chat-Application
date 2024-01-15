import Avatar from "../Avatar";
import style from "./Conversation.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  userId: number;
  image: string;
  conversationName: string;
  lastMessage?: string;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (userId: number) => void;
}

const Conversation = ({
  userId,
  image,
  conversationName,
  lastMessage = "",
  isActive = false,
  isNewMessage = false,
  onClick = () => {},
}: Props) => {
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
      onClick={() => onClick(userId)}
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
            "mb-1",
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
            {lastMessage}
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default Conversation;
