import Avatar from "../Avatar";

import appImages from "../../assets";
import style from "./ChatViewHeader.module.scss";
import classNames from "classnames/bind";
import AppButton from "../AppButton";

const cx = classNames.bind(style);

interface Props {
  images: string[];
  name: string;
  showAside: boolean;
  setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatViewHeader = ({ images, name, showAside, setShowAside }: Props) => {
  const handleToggleAside = () => setShowAside(!showAside);

  return (
    <>
      <div className={cx("avatar-container")}>
        <Avatar src={images[0]} alt="avatar" />
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

export default ChatViewHeader;
