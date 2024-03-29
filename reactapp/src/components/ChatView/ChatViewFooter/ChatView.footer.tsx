import { memo, useEffect, useState } from "react";

import style from "./ChatView.footer.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";

import {
  signalRDisableNotifyUserTyping,
  signalRNotifyUserTyping,
  useDebounce,
  useGlobalState,
  useSignalREvents,
} from "@/hooks";

import { useGetCurrentUser } from "@/hooks/queries/user";
import { useSendMessage } from "@/hooks/queries/message";
import { SenderConversationModel } from "@/models";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeConversationId] = useGlobalState("activeConversationId");
  const [connection] = useGlobalState("connection");
  // hook
  const invokeAction = useSignalREvents({ connection: connection });
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: sendMessageMutate } = useSendMessage();

  const debounceInvokeAction = useDebounce(() => {
    if (!currentUser) {
      return;
    }
    const model: SenderConversationModel = {
      senderId: currentUser.userId,
      conversationId: activeConversationId,
    };

    invokeAction(signalRDisableNotifyUserTyping(model));
  }, 1000);
  // debounce to remove the user typing notification
  useEffect(() => {
    debounceInvokeAction();
  }, [debounceInvokeAction, inputValue]);

  const fetchSendMessage = async () => {
    if (!currentUser) {
      return;
    }
    sendMessageMutate({
      senderId: currentUser.userId,
      conversationId: activeConversationId,
      messageContent: inputValue,
    });
    setInputValue("");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }
    const model: SenderConversationModel = {
      senderId: currentUser.userId,
      conversationId: activeConversationId,
    };

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
