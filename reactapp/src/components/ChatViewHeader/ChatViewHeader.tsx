import Avatar from "../Avatar";

import appImages from "../../assets";
import style from "./ChatViewHeader.module.scss";
import classNames from "classnames/bind";
import AppButton from "../AppButton";
import { useGlobalState } from "../../globalState";
import { memo, useEffect, useState } from "react";
import { User } from "../../models";
import images from "../../assets";

const cx = classNames.bind(style);

const ChatViewHeader = () => {
  const [showAside, setShowAside] = useGlobalState("showAside");
  const [userMap] = useGlobalState("userMap");
  const [activeConversation] = useGlobalState("activeConversation");
  //Local state
  const [receiver, setReceiver] = useState<User>();
  useEffect(() => {
    if (activeConversation === 0) {
      return;
    }

    if (userMap.has(activeConversation)) {
      setReceiver(userMap.get(activeConversation));
    }
  }, [activeConversation, userMap]);

  const handleToggleAside = () => setShowAside(!showAside);

  return (
    <>
      <div className={cx("avatar-container")}>
        <Avatar
          src={receiver ? receiver.avatarUrl : images.userIcon}
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
            {receiver && receiver.name}
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
