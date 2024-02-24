import { memo, useEffect, useState } from "react";

import style from "./ChatView.footer.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";

import {
  signalRDisableNotifyUserTyping,
  signalRNotifyUserTyping,
  signalRSendGroupMessage,
  signalRSendIndividualMessage,
  useDebounce,
  useGlobalState,
  useSignalREvents,
  useSortableArray,
} from "@/hooks";

import { GroupMessage, IndividualMessage, SenderReceiverArray } from "@/models";

import { sendGroupMessage } from "@/services/groupMessage";
import { sendIndividualMessage } from "@/services/individualMessage";

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
  const [moveMessageToTop] = useSortableArray<IndividualMessage | GroupMessage>(
    lastMessageList,
    setLastMessageList as React.Dispatch<
      React.SetStateAction<(IndividualMessage | GroupMessage)[]>
    >
  );

  const model: SenderReceiverArray = {
    senderId: userId,
    receiverId: activeConversation,
    type: messageType,
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
      const indexToUpdate = lastMessageList.findIndex((messageObj, index) => {
        if (messageObj.message.messageType === "Group") {
          return false;
        }
        const im = lastMessageList[index] as IndividualMessage;
        return (
          (userId === im.message.senderId &&
            activeConversation === im.userReceiverId) ||
          (activeConversation === im.message.senderId &&
            userId === im.userReceiverId)
        );
      });
      if (indexToUpdate !== -1) {
        lastMessageList[indexToUpdate] = data;
        moveMessageToTop(indexToUpdate);
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
      invokeAction(signalRSendGroupMessage(data));
      setInputValue("");
      //Update last message
      const indexToUpdate = lastMessageList.findIndex((messageObj, index) => {
        if (messageObj.message.messageType === "Individual") {
          return false;
        }
        const gm = lastMessageList[index] as GroupMessage;
        return activeConversation === gm.groupReceiverId;
      });
      if (indexToUpdate !== -1) {
        lastMessageList[indexToUpdate] = data;
        moveMessageToTop(indexToUpdate);
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
