import Avatar from "../Avatar";

import style from "./ChatViewContainer.module.scss";
import images from "../../assets";
import classNames from "classnames/bind";
import ChatViewHeader from "../ChatViewHeader";
import ChatViewFooter from "../ChatViewFooter";

const cx = classNames.bind(style);
interface Props {
  showAside: boolean;
  onToggleAside: () => void;
}

const ChatViewContainer = ({ showAside, onToggleAside }: Props) => {
  const image = images.userIcon;
  const name =
    "This name is very loonoooooooooooooooonngg and it could break my layout :) 🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡";

  return (
    <div className={cx("chat-box-container", "h-100", "d-flex", "flex-column")}>
      <div className={cx("user-info-container", "d-flex")}>
        <ChatViewHeader
          images={[image]}
          name={name}
          showAside={showAside}
          onToggleAside={onToggleAside}
        />
      </div>

      <div className={cx("conversation-container", "flex-grow-1")}>
        <div className={cx("message-container")}>
          <div className={cx("message-item-container sender")}>
            <div className={cx("message-list")}>
              <div className={cx("message")}>
                <div className={cx("message-content")}>message content</div>
                <div className={cx("message-time")}>time</div>
              </div>
              <div className={cx("message")}>
                <div className={cx("message-content")}>message content</div>
                <div className={cx("message-time")}>time</div>
              </div>
            </div>
          </div>

          <div className={cx("message-item-container receiver")}>
            <div className={cx("user-avatar")}>
              <Avatar src={images.userIcon} alt="avatar" />
            </div>
            <div className={cx("message-list")}>
              <div className={cx("message")}>
                <div className={cx("user-name")}>name</div>
                <div className={cx("message-content")}>mesage content</div>
                <div className={cx("message-time")}>time</div>
              </div>
              <div className={cx("message")}>
                <div className={cx("message-content")}>mesage content</div>
                <div className={cx("message-time")}>time</div>
              </div>
              <div className={cx("message")}>
                <div className={cx("message-content")}>mesage content</div>
                <div className={cx("message-time")}>time</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("user-input-notification")}>
          User A is typing ...
        </div>
      </div>

      <div className={cx("input-message-container", "w-100", "d-flex")}>
        <ChatViewFooter />
      </div>
    </div>
  );
};

export default ChatViewContainer;
