import { memo, useCallback, useState } from "react";

import Avatar from "@/components/shared/Avatar";
import AppButton from "@/components/shared/AppButton";

import {
  signalRCall,
  useGlobalState,
  useModal,
  useSignalREvents,
} from "@/hooks";

import { GroupConversation, ModalType } from "@/models";

import style from "./ChatView.header.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import {
  useGetConversation,
  useGetMemberListByConversationId,
} from "@/hooks/queries/conversation";
import { useGetUser } from "@/hooks/queries/user";
import UserStatus from "../UserStatus";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);

const ChatViewHeader = () => {
  const [showAside, setShowAside] = useGlobalState("showAside");
  const [conversationType] = useGlobalState("conversationType");
  const [activeConversationId] = useGlobalState("activeConversationId");
  const [isCalling, setIsCalling] = useState(false);
  // hook
  const { invokeAction } = useSignalREvents();
  const { handleShowModal } = useModal();
  const isGroup = conversationType === "GROUP";

  const { data: conversationUsersData } = useGetMemberListByConversationId(
    { conversationId: activeConversationId, other: true },
    {
      enabled: !!activeConversationId,
    }
  );
  const handleToggleAside = () => setShowAside(!showAside);
  const handleCall = useCallback(() => {
    invokeAction(
      signalRCall({
        targetConversationId: activeConversationId,
      })
    );
  }, [activeConversationId, invokeAction]);

  const handleClickAvatar = useCallback(() => {
    const modalType: ModalType =
      conversationType === "GROUP" ? "Group" : "Friend";
    if (modalType === "Group") {
      handleShowModal({ entityId: activeConversationId, modalType });
    } else {
      handleShowModal({
        entityId: conversationUsersData?.[0]?.userId,
        modalType,
      });
    }
  }, [
    activeConversationId,
    conversationType,
    conversationUsersData,
    handleShowModal,
  ]);

  const handleClickAddGroupMember = useCallback(() => {
    if (!isGroup) {
      return;
    }
    handleShowModal({
      modalType: "AddGroupMember",
      entityId: activeConversationId,
    });
  }, [activeConversationId]);

  const { data: conversationData } = useGetConversation(
    { conversationId: activeConversationId },
    {
      enabled: isGroup && !!activeConversationId,
    }
  );
  const { data: otherUserData } = useGetUser(
    conversationUsersData?.[0]?.userId ?? "",
    {
      enabled: !isGroup && !!conversationUsersData?.[0]?.userId,
    }
  );
  const avatar =
    (isGroup
      ? (conversationData as GroupConversation)?.imageURL
      : otherUserData?.avatarUrl) ?? images.userIcon.src;
  const name =
    (isGroup
      ? (conversationData as GroupConversation)?.name
      : otherUserData?.name) ?? "";
      
  if (!activeConversationId) {
    return;
  }
  return (
    <>
      <div
        role="button"
        className={cx("avatar-container")}
        onClick={handleClickAvatar}
      >
        <Avatar
          src={avatar}
          avatarClassName={cx("rounded-circle")}
          alt="avatar"
        />
      </div>
      {/* The parent must be relative and the width must be 100%, otherwise it
      didn't show anything */}
      <div className={cx("conversation-info", "w-100")}>
        <div className={cx("user-name-container", "position-relative")}>
          {/* For truncating text, the parent must be relative while the child is
        absolute References:
        https://stackoverflow.com/questions/48623725/how-can-i-hide-overflown-text-as-ellipsis-using-dynamic-bootstrap-cols */}
          <div
            className={cx(
              "user-name",
              "text-truncate",
              "position-absolute",
              "start-0",
              "top-0",
              "end-0",
              "bottom-0"
            )}
          >
            {name}
          </div>
        </div>
        <UserStatus type={conversationType} />
      </div>
      <div className={cx("icon-container", "ps", "d-flex", "gap-2")}>
        {isGroup && (
          <AppButton
            variant="app-btn-tertiary-transparent"
            className={cx(
              "icon-btn",
              "d-flex",
              "justify-content-center",
              "align-items-center"
            )}
            onClick={handleClickAddGroupMember}
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </AppButton>
        )}
        <AppButton
          variant="app-btn-tertiary-transparent"
          className={cx(
            "icon-btn",
            "d-flex",
            isCalling && "active",
            "justify-content-center",
            "align-items-center"
          )}
          onClick={handleCall}
        >
          {isCalling ? (
            <Avatar
              variant="avatar-img-20px"
              src={images.phoneCallActiveIcon.src}
              alt="sidebar icon"
            />
          ) : (
            <Avatar
              variant="avatar-img-20px"
              src={images.phoneCallIcon.src}
              alt="sidebar icon"
            />
          )}
        </AppButton>
        <AppButton
          variant="app-btn-tertiary-transparent"
          className={cx(
            "icon-btn",
            showAside && "active",
            "d-flex",
            "justify-content-center",
            "align-items-center"
          )}
          onClick={handleToggleAside}
        >
          {showAside ? (
            <Avatar
              variant="avatar-img-20px"
              src={images.sidebarIconActive.src}
              alt="sidebar icon"
            />
          ) : (
            <Avatar
              variant="avatar-img-20px"
              src={images.sidebarIcon.src}
              alt="sidebar icon"
            />
          )}
        </AppButton>
      </div>
    </>
  );
};

export default memo(ChatViewHeader);
