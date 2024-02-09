import { memo, useRef, useState } from "react";
import AppButton from "../AppButton";

import style from "./ChatViewFooter.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../globalState";
import { sendIndividualMessage } from "../../services/message";
import {
  signalRDisableNotifyUserTyping,
  signalRNotifyUserTyping,
  signalRSendIndividualMessage,
  useSignalREvents,
} from "../../hooks";
import { SenderReceiverArray } from "../../models";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [userId] = useGlobalState("userId");
  const [activeConversation] = useGlobalState("activeConversation");
  const [individualMessages, setIndividualMessages] = useGlobalState(
    "individualMessageList"
  );
  const [connection] = useGlobalState("connection");
  // hook
  const invokeAction = useSignalREvents({ connection: connection });

  const inputTimeout = useRef<NodeJS.Timeout | null>(null);

  const fetchSendMessage = async () => {
    const [data] = await sendIndividualMessage(
      userId,
      activeConversation,
      inputValue
    );
    if (!data) {
      return;
    }
    setIndividualMessages([...individualMessages, data]);
    invokeAction(signalRSendIndividualMessage(data));
    setInputValue("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const model: SenderReceiverArray = {
      senderIdList: [userId],
      receiverIdList: [activeConversation],
    };
    if (!inputTimeout.current) {
      invokeAction(signalRNotifyUserTyping(model));
      console.log("first change");
    } else {
      clearTimeout(inputTimeout.current);
      inputTimeout.current = null;
    }
    inputTimeout.current = setTimeout(() => {
      if (!inputTimeout.current) {
        return;
      }
      console.log("clear time out");
      console.log(model);
      invokeAction(signalRDisableNotifyUserTyping(model));
      clearTimeout(inputTimeout.current);
      inputTimeout.current = null;
    }, 1000);
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
        value={inputValue}
        onChange={(e) => handleInputChange(e)}
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
