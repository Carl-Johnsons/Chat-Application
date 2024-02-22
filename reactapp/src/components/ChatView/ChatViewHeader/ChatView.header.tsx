import { memo, useEffect, useState } from "react";

import Avatar from "@/components/shared/Avatar";
import AppButton from "@/components/shared/AppButton";

import { useGlobalState, useModal } from "@/hooks";

import { Group, User } from "@/models";

import style from "./ChatView.header.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";

const cx = classNames.bind(style);

const ChatViewHeader = () => {
  const [showAside, setShowAside] = useGlobalState("showAside");
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const [groupUserMap] = useGlobalState("groupUserMap");
  const [messageType] = useGlobalState("messageType");
  const [activeConversation] = useGlobalState("activeConversation");
  //Local state
  const [receiver, setReceiver] = useState<User | Group>();
  // hook
  const { handleShowModal } = useModal();
  const isGroup = messageType === "Group";

  useEffect(() => {
    if (activeConversation === 0) {
      return;
    }

    if (!isGroup && userMap.has(activeConversation)) {
      setReceiver(userMap.get(activeConversation));
      return;
    }
    if (isGroup && groupMap.has(activeConversation)) {
      setReceiver(groupMap.get(activeConversation));
      return;
    }
  }, [activeConversation, groupMap, isGroup, userMap]);

  const handleToggleAside = () => setShowAside(!showAside);
  const handleClickAvatar = () => {
    handleShowModal({ entityId: activeConversation });
  };
  const avatar =
    (receiver as User)?.avatarUrl ?? (receiver as Group)?.groupAvatarUrl;
  const name = (receiver as User)?.name ?? (receiver as Group)?.groupName;
  const isOnline = (receiver as User)?.isOnline;
  return (
    <>
      <div
        role="button"
        className={cx("avatar-container")}
        onClick={handleClickAvatar}
      >
        <Avatar
          src={receiver ? avatar : images.userIcon.src}
          className={cx("rounded-circle")}
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
            {receiver && name}
          </div>
        </div>
        <div className={cx("user-status")}>
          {isGroup
            ? `${groupUserMap.get(activeConversation)?.length} thành viên`
            : isOnline
            ? "Online"
            : "Offline"}
        </div>
      </div>
      <div className={cx("icon-container", "ps")}>
        <AppButton
          variant="app-btn-tertiary-transparent"
          className={cx(
            "icon-btn",
            showAside && "active",
            "d-flex",
            "justify-content-center"
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
