import Avatar from "../Avatar";

import appImages from "../../assets";
import style from "./ChatViewHeader.module.scss";
import classNames from "classnames/bind";
import AppButton from "../AppButton";
import { useGlobalState } from "../../globalState";
import { memo, useEffect, useState } from "react";
import { Group, User } from "../../models";
import images from "../../assets";
import { useModal } from "../../hooks";

const cx = classNames.bind(style);

const ChatViewHeader = () => {
  const [showAside, setShowAside] = useGlobalState("showAside");
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const [messageType] = useGlobalState("messageType");
  const [activeConversation] = useGlobalState("activeConversation");
  //Local state
  const [receiver, setReceiver] = useState<User | Group>();
  // hook
  const { handleShowModal } = useModal();
  useEffect(() => {
    if (activeConversation === 0) {
      return;
    }

    if (messageType == "Individual" && userMap.has(activeConversation)) {
      setReceiver(userMap.get(activeConversation));
      return;
    }
    if (messageType == "Group" && groupMap.has(activeConversation)) {
      setReceiver(groupMap.get(activeConversation));
      return;
    }
  }, [activeConversation, groupMap, messageType, userMap]);

  const handleToggleAside = () => setShowAside(!showAside);
  const handleClickAvatar = () => {
    handleShowModal(activeConversation);
  };
  const avatar =
    (receiver as User)?.avatarUrl ?? (receiver as Group)?.groupAvatarUrl;
  const name = (receiver as User)?.name ?? (receiver as Group)?.groupName;
  return (
    <>
      <div role="button" className={cx("avatar-container")} onClick={handleClickAvatar}>
        <Avatar
          src={receiver ? avatar : images.userIcon}
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
        <div className={cx("user-status")}>Vừa mới truy cập</div>
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
              src={appImages.sidebarIconActive}
              alt="sidebar icon"
            />
          ) : (
            <Avatar
              variant="avatar-img-20px"
              src={appImages.sidebarIcon}
              alt="sidebar icon"
            />
          )}
        </AppButton>
      </div>
    </>
  );
};

export default memo(ChatViewHeader);
