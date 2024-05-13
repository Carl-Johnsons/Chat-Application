import { memo } from "react";

import Avatar from "@/components/shared/Avatar";
import AppButton from "@/components/shared/AppButton";

import { useGlobalState, useModal } from "@/hooks";

import { GroupConversation, ModalType } from "@/models";

import style from "./ChatView.header.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import {
  useGetConversation,
  useGetConversationUsersByConversationId,
} from "@/hooks/queries/conversation";
import { useGetCurrentUser, useGetUser } from "@/hooks/queries/user";
import UserStatus from "../UserStatus";

const cx = classNames.bind(style);

const ChatViewHeader = () => {
  const [showAside, setShowAside] = useGlobalState("showAside");
  const [conversationType] = useGlobalState("conversationType");
  const [activeConversationId] = useGlobalState("activeConversationId");
  // hook
  const { handleShowModal } = useModal();
  const isGroup = conversationType === "Group";

  const handleToggleAside = () => setShowAside(!showAside);
  const handleClickAvatar = () => {
    const modalType: ModalType =
      conversationType === "Group" ? "Group" : "Friend";
    handleShowModal({ entityId: activeConversationId, modalType });
  };
  const { data: currentUserData } = useGetCurrentUser();
  const { data: conversationUsersData } =
    useGetConversationUsersByConversationId(activeConversationId);
  const otherUserId =
    conversationUsersData &&
    (conversationUsersData[0].userId == currentUserData?.id
      ? conversationUsersData[1].userId
      : conversationUsersData[0].userId);

  const { data: conversationData } = useGetConversation(
    { conversationId: activeConversationId },
    {
      enabled: isGroup,
    }
  );
  const { data: otherUserData } = useGetUser(otherUserId ?? "", {
    enabled: !!otherUserId,
  });
  const avatar =
    (isGroup
      ? (conversationData as GroupConversation).imageURL
      : otherUserData?.avatarUrl) ?? images.userIcon.src;
  const name = otherUserData?.name ?? "";

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
      <div className={cx("icon-container", "ps")}>
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
