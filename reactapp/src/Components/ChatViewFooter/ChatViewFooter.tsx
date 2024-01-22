import { useState } from "react";
import AppButton from "../AppButton";

import style from "./ChatViewFooter.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../GlobalState";
import APIUtils from "../../Utils/Api/APIUtils";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [userId] = useGlobalState("userId");
  const [activeConversation] = useGlobalState("activeConversation");
  const [individualMessages, setIndividualMessages] = useGlobalState(
    "individualMessageList"
  );

  async function fetchSendMessage() {
    const [data] = await APIUtils.sendIndividualMessage(
      userId,
      activeConversation,
      inputValue
    );
    data && setIndividualMessages([...individualMessages, data]);
    setInputValue("");
  }
  const onKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      fetchSendMessage();
    }
  };

  const handleClick = async () => {
    fetchSendMessage();
  };
  return (
    <>
      <input
        defaultValue={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
        className={cx("input-message", "flex-grow-1", "border-0")}
      />
      <div className="btn-container">
        <AppButton
          variant="app-btn-tertiary"
          onClick={handleClick}
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
