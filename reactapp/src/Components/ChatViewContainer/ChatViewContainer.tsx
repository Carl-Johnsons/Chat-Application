import { useGlobalState } from "../../globalState";

import ChatViewHeader from "../ChatViewHeader";
import ChatViewFooter from "../ChatViewFooter";

import style from "./ChatViewContainer.module.scss";
import classNames from "classnames/bind";

import { memo, useEffect, useRef } from "react";
import ChatViewBody from "../ChatViewBody";

const cx = classNames.bind(style);
interface Props {
  className?: string;
}

const ChatViewContainer = ({ className }: Props) => {
  const [individualMessages] = useGlobalState("individualMessageList");
  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      const ele = messageContainerRef.current as HTMLElement;
      ele.scrollTop = ele.scrollHeight;
    }
  }, [individualMessages]);


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
        <ChatViewHeader />
      </div>

      <div
        className={cx(
          "conversation-container",
          "flex-grow-1",
          "overflow-y-hidden"
        )}
      >
        <div
          ref={messageContainerRef}
          className={cx("message-container", "overflow-y-scroll")}
        >
          <ChatViewBody />
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

export default memo(ChatViewContainer);
