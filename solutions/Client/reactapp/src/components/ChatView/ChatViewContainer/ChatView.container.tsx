import { useGlobalState } from "@/hooks";

import ChatViewHeader from "../ChatViewHeader";
import ChatViewFooter from "../ChatViewFooter";

import style from "./ChatView.container.module.scss";
import classNames from "classnames/bind";

import { memo } from "react";
import ChatViewBody from "../ChatViewBody";
import { useGetUser } from "@/hooks/queries/user";

const cx = classNames.bind(style);
interface Props {
  className?: string;
}

const ChatViewContainer = ({ className }: Props) => {
  const [userTypingId] = useGlobalState("userTypingId");
  const { data: userTyping, isLoading } = useGetUser(userTypingId ?? "", {
    enabled: !!userTypingId,
  });

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
        <ChatViewBody
          className={cx("message-container", "overflow-y-scroll")}
        />
        {userTypingId && userTyping && !isLoading && (
          <div className={cx("user-input-notification")}>
            User {userTyping.name} is typing ...
          </div>
        )}
      </div>

      <div className={cx("input-message-container", "w-100", "d-flex")}>
        <ChatViewFooter />
      </div>
    </div>
  );
};

export default memo(ChatViewContainer);
