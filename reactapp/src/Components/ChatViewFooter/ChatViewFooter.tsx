import AppButton from "../AppButton";

import style from "./ChatViewFooter.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  return (
    <>
      <input className={cx("input-message", "flex-grow-1", "border-0")} />
      <div className="btn-container">
        <AppButton
          variant="app-btn-tertiary"
          className={cx(
            "btn-send-message",
            "rounded-0",
            "text-uppercase",
            "fw-bold"
          )}
        >
          Gửi
        </AppButton>
      </div>
    </>
  );
};

export default ChatViewFooter;
