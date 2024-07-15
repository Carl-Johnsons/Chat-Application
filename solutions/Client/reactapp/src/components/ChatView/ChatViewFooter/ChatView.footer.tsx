import { memo, useCallback, useRef, useState, ClipboardEvent } from "react";

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
import { UserTypingNotificationDTO } from "@/models/DTOs";
import { AppDivider, ClearableFile } from "@/components/shared";

const cx = classNames.bind(style);
const ChatViewFooter = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeConversationId] = useGlobalState("activeConversationId");
  // hook
  const { invokeAction } = useSignalREvents();
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: sendMessageMutate } = useSendMessage();
  const [blobs, setBlobs] = useState<Blob[]>([]);
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
    if (!currentUser && !inputValue) {
      return;
    }
    sendMessageMutate({
      conversationId: activeConversationId,
      messageContent: inputValue,
      files: blobs,
    });
    setInputValue("");
    setBlobs([]);
  }, [activeConversationId, currentUser, inputValue, sendMessageMutate, blobs]);

  const onKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      fetchSendMessage();
    }
  };

  const handleClick = async () => {
    fetchSendMessage();
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const clipboardData = e.clipboardData;
    const items = clipboardData?.items;
    if (!items) {
      return;
    }
    const newBlob: Blob[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemType = item.type;
      if (itemType.startsWith("image/")) {
        const blob = item.getAsFile();
        blob && newBlob.push(blob);
      }

      if (
        itemType.startsWith("video/") ||
        itemType.startsWith("application/")
      ) {
        const blob = item.getAsFile();
        if (blob) {
          console.log("hello world");
          console.log({ blob });
        }
      }
      console.log(`Item ${i}:`, item);
      console.log(`Type: ${itemType}`);
    }
    setBlobs((prev) => [...prev, ...newBlob]);
    return () => {
      setBlobs([]);
    };
  };

  const handleCancelBlob = (blob: Blob) => {
    setBlobs((prev) => {
      prev = prev.filter((b) => b !== blob);
      return prev;
    });
  };

  const handleCancelAllBlobs = () => {
    setBlobs([]);
  };
  if (!activeConversationId) {
    return;
  }
  return (
    <div className={cx("chat-view-footer", "w-100", "p-3")}>
      <div className={cx("d-flex")}>
        <input
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={onKeyDown}
          className={cx("input-message", "flex-grow-1", "border-0")}
          onPaste={(e) => handlePaste(e)}
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
      </div>
      {blobs.length > 0 && (
        <>
          <AppDivider />
          <div
            className={cx(
              "file-container",
              "mt-2",
              "d-flex",
              "flex-wrap",
              "overflow-y-scroll",
              "overflow-x-hidden",
              "gap-2"
            )}
          >
            {blobs.map((blob, index) => {
              return (
                <ClearableFile
                  className={cx("clearable-file")}
                  key={index}
                  blob={blob}
                  onClickCancel={() => handleCancelBlob(blob)}
                  minDimension={{ width: 100, height: 80 }}
                  maxDimension={{ width: 100, height: 80 }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
export default memo(ChatViewFooter);
