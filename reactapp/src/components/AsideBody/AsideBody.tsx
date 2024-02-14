import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppButton from "../AppButton";
import Avatar from "../Avatar";

import { Group, User } from "../../models";
import { useGlobalState } from "../../globalState";
import style from "./AsideBody.module.scss";
import classnames from "classnames/bind";

import {
  faBell,
  faGear,
  faThumbTack,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
const cx = classnames.bind(style);

const AsideBody = () => {
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageType] = useGlobalState("messageType");
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");

  const currentEntity =
    messageType === "Individual"
      ? userMap.get(activeConversation)
      : groupMap.get(activeConversation);
  const avatar =
    (currentEntity as User)?.avatarUrl ??
    (currentEntity as Group)?.groupAvatarUrl;
  const name =
    (currentEntity as User)?.name ?? (currentEntity as Group)?.groupName;

  return (
    <>
      <div
        className={cx(
          "user-info-container",
          "d-flex",
          "flex-column",
          "justify-content-center",
          "align-items-center"
        )}
      >
        <div className={cx("pt-4")}>
          <Avatar
            variant="avatar-img-50px"
            className={cx("rounded-circle")}
            src={avatar}
            alt="user avatar"
          />
        </div>
        <div className={cx("name", "pt-2", "fw-medium")}>{name}</div>
        <div
          className={cx(
            "functional-btn-container",
            "pt-3",
            "d-flex",
            "justify-content-around",
            "w-100"
          )}
        >
          <div
            className={cx(
              "btn-container",
              "d-flex",
              "flex-column",
              "align-items-center"
            )}
          >
            <AppButton
              variant="app-btn-primary"
              className={cx(
                "functional-btn",
                "rounded-circle",
                "d-flex",
                "justify-content-center",
                "align-items-center"
              )}
            >
              <FontAwesomeIcon icon={faBell} />
            </AppButton>
            <p className={cx("pt-1", "text-center")}>Tắt thông báo</p>
          </div>
          <div
            className={cx(
              "btn-container",
              "d-flex",
              "flex-column",
              "align-items-center"
            )}
          >
            <AppButton
              variant="app-btn-primary"
              className={cx(
                "functional-btn",
                "rounded-circle",
                "d-flex",
                "justify-content-center",
                "align-items-center"
              )}
            >
              <FontAwesomeIcon icon={faThumbTack} />
            </AppButton>
            <p className={cx("pt-1", "text-center")}>Ghim hội thoại</p>
          </div>
          <div
            className={cx(
              "btn-container",
              "d-flex",
              "flex-column",
              "align-items-center"
            )}
          >
            <AppButton
              variant="app-btn-primary"
              className={cx(
                "functional-btn",
                "rounded-circle",
                "d-flex",
                "justify-content-center",
                "align-items-center"
              )}
            >
              {messageType === "Group" ? (
                <FontAwesomeIcon icon={faUserGroup} />
              ) : (
                <FontAwesomeIcon icon={faUserGroup} />
              )}
            </AppButton>
            <p className={cx("pt-1", "text-center")}>
              {messageType === "Group"
                ? "Thêm thành viên"
                : "Tạo nhóm trò chuyện"}
            </p>
          </div>
          {messageType === "Group" && (
            <div
              className={cx(
                "btn-container",
                "d-flex",
                "flex-column",
                "align-items-center"
              )}
            >
              <AppButton
                variant="app-btn-primary"
                className={cx(
                  "functional-btn",
                  "rounded-circle",
                  "d-flex",
                  "justify-content-center",
                  "align-items-center"
                )}
              >
                <FontAwesomeIcon icon={faGear} />
              </AppButton>
              <p className={cx("pt-1", "text-center")}>Quản lý nhóm</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AsideBody;
