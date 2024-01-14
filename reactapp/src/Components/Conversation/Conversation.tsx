import images from "../../assets";
import Avatar from "../Avatar";
import style from "./Conversation.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const Conversation = () => {
  const userId: number = 1;
  const image = images.defaultAvatarImg;
  const conversationName = "Group 2";
  const lastMessage = "You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll";
  const isActive = true;
  const isNewMessage = true;
  return (
    <div
      className={cx(
        "conversation",
        "w-100",
        "position-relative",
        "d-flex",
        isActive ? "active" : "",
        isNewMessage ? "new-message" : ""
      )}
      role="button"
      data-user-id={userId}
    >
      <div className={cx("conversation-avatar", "d-flex","align-items-center", "me-2")}>
        <Avatar
          src={image}
          className={cx("rounded-circle")}
          alt="user avatar"
        />
      </div>
      <div className={cx("conversation-description", "flex-grow-1")}>
        <div className={cx("conversation-name", "text-truncate", "mt-2")}>
          {conversationName}
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
    </div>
  );
};

export default Conversation;
