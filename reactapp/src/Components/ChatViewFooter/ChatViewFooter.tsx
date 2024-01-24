import { memo, useState } from "react";
import AppButton from "../AppButton";

import style from "./ChatViewFooter.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../GlobalState";
import APIUtils from "../../Utils/Api/APIUtils";
import useSignalREvents, {
  sendIndividualMessage,
} from "../../hooks/useSignalREvents";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [userId] = useGlobalState("userId");
  const [activeConversation] = useGlobalState("activeConversation");
  const [individualMessages, setIndividualMessages] = useGlobalState(
    "individualMessageList"
  );
  const [connection] = useGlobalState("connection");
  const invokeAction = useSignalREvents({ connection: connection });

  const fetchSendMessage = async () => {
    const [data] = await APIUtils.sendIndividualMessage(
      userId,
      activeConversation,
      inputValue
    );
    if (!data) {
      return;
    }
    setIndividualMessages([...individualMessages, data]);
    invokeAction(sendIndividualMessage(data));
    setInputValue("");
  };
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
export default memo(ChatViewFooter);
