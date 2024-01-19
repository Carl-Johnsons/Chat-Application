import { useGlobalState } from "../../GlobalState";

import ChatViewHeader from "../ChatViewHeader";
import ChatViewFooter from "../ChatViewFooter";

import style from "./ChatViewContainer.module.scss";
import classNames from "classnames/bind";

import Message from "../Message";

const cx = classNames.bind(style);
interface Props {
  showAside: boolean;
  className?: string;
  setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatViewContainer = ({ showAside, className, setShowAside }: Props) => {
  const [user] = useGlobalState("user");
  const [individualMessages] = useGlobalState("individualMessageList");

  const createMessageItemContainer = () => {
    if (!individualMessages || individualMessages.length === 0) {
      return;
    }
    let start = individualMessages[0].userReceiverId;
    let startIndex = 0;
    const messageContainers = [];
    // For removing Reactjs key warning
    let key = 0;
    for (let i = 1; i <= individualMessages.length; i++) {
      if (
        i !== individualMessages.length &&
        start === individualMessages[i].userReceiverId
      ) {
        continue;
      }
      const subArray = individualMessages.slice(startIndex, i);
      if (i < individualMessages.length) {
        start = individualMessages[i].userReceiverId;
        startIndex = i;
      }
      const isSender = user.userId !== subArray[0].userReceiverId;
      const messageContainer = (
        <div
          key={key}
          className={cx("message-item-container", isSender && "sender")}
        >
          <div
            className={cx(
              "message-list",
              "w-100",
              "d-flex",
              "flex-column",
              isSender ? "align-items-end" : "align-items-start"
            )}
          >
            {subArray.map((im) => (
              <Message
                key={im.messageId}
                name={im.userReceiverId + ""}
                content={im.message.content}
                time={im.message.time}
                sender={isSender}
              />
            ))}
          </div>
        </div>
      );
      key++;
      messageContainers.push(messageContainer);
    }
    return messageContainers;
  };

  return (
    <div
      className={cx(
        "chat-box-container",
        "h-100",
        "d-flex",
        "flex-column",
        className
      )}
    >
      <div className={cx("user-info-container", "d-flex")}>
        <ChatViewHeader showAside={showAside} setShowAside={setShowAside} />
      </div>

      <div
        className={cx(
          "conversation-container",
          "flex-grow-1",
          "overflow-y-hidden"
        )}
      >
        <div className={cx("message-container", "overflow-y-scroll")}>
          {createMessageItemContainer()}
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
