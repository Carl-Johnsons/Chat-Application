import { memo, useEffect, useState } from "react";
import AppButton from "../../shared/AppButton";

import style from "./ChatViewFooter.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../../globalState";

import {
  signalRDisableNotifyUserTyping,
  signalRNotifyUserTyping,
  signalRSendIndividualMessage,
  useSignalREvents,
} from "../../../hooks";
import {
  GroupMessage,
  IndividualMessage,
  SenderReceiverArray,
} from "../../../models";
import useDebounce from "../../../hooks/useDebounce";
import { sendIndividualMessage } from "../../../services/individualMessage";
import { sendGroupMessage } from "../../../services/groupMessage";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [userId] = useGlobalState("userId");
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageList, setMessageList] = useGlobalState("messageList");
  const [lastMessageList, setLastMessageList] =
    useGlobalState("lastMessageList");
  const [messageType] = useGlobalState("messageType");
  const [connection] = useGlobalState("connection");
  // hook
  const invokeAction = useSignalREvents({ connection: connection });

  const model: SenderReceiverArray = {
    senderIdList: [userId],
    receiverIdList: [activeConversation],
  };

  const debounceInvokeAction = useDebounce(() => {
    invokeAction(signalRDisableNotifyUserTyping(model));
  }, 1000);
  // debounce to remove the user typing notification
  useEffect(() => {
    debounceInvokeAction();
  }, [debounceInvokeAction, inputValue]);

  const fetchSendMessage = async () => {
    // This active conversation may be wrong for the group message. Implement later
    if (messageType == "Individual") {
      const [data] = await sendIndividualMessage(
        userId,
        activeConversation,
        inputValue
      );
      if (!data) {
        return;
      }

      setMessageList([...(messageList as IndividualMessage[]), data]);
      invokeAction(signalRSendIndividualMessage(data));
      setInputValue("");
      //Update last message
      for (let index = 0; index < lastMessageList.length; index++) {
        if (lastMessageList[index].message.messageType === "Group") {
          continue;
        }
        const im = lastMessageList[index] as IndividualMessage;
        if (
          (userId === im.message.senderId &&
            activeConversation === im.userReceiverId) ||
          (activeConversation === im.message.senderId &&
            userId === im.userReceiverId)
        ) {
          setLastMessageList([
            data,
            ...lastMessageList.slice(0, index),
            ...lastMessageList.splice(index + 1, lastMessageList.length),
          ] as IndividualMessage[] | GroupMessage[]);
          return;
        }
      }
    }
    if (messageType == "Group") {
      const [data] = await sendGroupMessage(
        userId,
        activeConversation,
        inputValue
      );
      if (!data) {
        return;
      }
      setMessageList([...(messageList as GroupMessage[]), data]);
      setInputValue("");
      //Update last message
      for (let index = 0; index < lastMessageList.length; index++) {
        if (lastMessageList[index].message.messageType === "Individual") {
          continue;
        }
        const im = lastMessageList[index] as GroupMessage;
        if (activeConversation === im.groupReceiverId) {
          setLastMessageList([
            data,
            ...lastMessageList.slice(0, index),
            ...lastMessageList.splice(index + 1, lastMessageList.length),
          ] as IndividualMessage[] | GroupMessage[]);
          return;
        }
      }
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    invokeAction(signalRNotifyUserTyping(model));
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
