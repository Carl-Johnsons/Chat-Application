import { memo, useCallback, useRef, useState } from "react";

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
import { UserTypingNotificationDTO } from "models/DTOs/UserTypingNotification.dto";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeConversationId] = useGlobalState("activeConversationId");
  // hook
  const { invokeAction } = useSignalREvents();
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: sendMessageMutate } = useSendMessage();
  const isTyping = useRef(false);

  const debounceInvokeDisableNotifyUserTyping = useDebounce(() => {
    if (!currentUser) {
      return;
    }
    const model: UserTypingNotificationDTO = {
      senderId: currentUser.id,
      conversationId: activeConversationId,
    };
    invokeAction(signalRDisableNotifyUserTyping(model));
    isTyping.current = false;
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentUser) {
      return;
    }

    setInputValue(e.target.value);
    if (!isTyping.current) {
      const model: UserTypingNotificationDTO = {
        senderId: currentUser.id,
        conversationId: activeConversationId,
      };
      invokeAction(signalRNotifyUserTyping(model));
      isTyping.current = true;
    }

    debounceInvokeDisableNotifyUserTyping();
  };

  const fetchSendMessage = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    sendMessageMutate({
      conversationId: activeConversationId,
      messageContent: inputValue,
    });
    setInputValue("");
  }, [activeConversationId, currentUser, inputValue, sendMessageMutate]);
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
