import style from "./Aside.body.module.scss";
import classnames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCopy,
  faGear,
  faLink,
  faShare,
  faThumbTack,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
// component
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";

//hook
import { useGlobalState } from "@/hooks";
// model
import { User, Group } from "@/models";
const cx = classnames.bind(style);

const AsideBody = () => {
  const [activeConversation] = useGlobalState("activeConversation");
  const [messageType] = useGlobalState("messageType");
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const [groupUserMap] = useGlobalState("groupUserMap");

  const isGroup = messageType === "Group";

  const currentEntity =
    messageType === "Individual"
      ? userMap.get(activeConversation)
      : groupMap.get(activeConversation);
  const avatar =
    (currentEntity as User)?.avatarUrl ??
    (currentEntity as Group)?.groupAvatarUrl ??
    images.userIcon.src;
  const name =
    (currentEntity as User)?.name ?? (currentEntity as Group)?.groupName;
  const groupLink = (currentEntity as Group)?.groupInviteUrl;
  const groupUser = isGroup ? groupUserMap.get(activeConversation) : undefined;
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
              {isGroup ? (
                <FontAwesomeIcon icon={faUserGroup} />
              ) : (
                <FontAwesomeIcon icon={faUserGroup} />
              )}
            </AppButton>
            <p className={cx("pt-1", "text-center")}>
              {isGroup ? "Thêm thành viên" : "Tạo nhóm trò chuyện"}
            </p>
          </div>
          {isGroup && (
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
      {isGroup && (
        <div className={cx("ps-3", "pe-3", "pt-2")}>
          <button
            className={cx("fw-medium", "btn")}
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            role="button"
          >
            Thành viên nhóm
          </button>
          <div className="collapse" id="collapseExample">
            <div className={cx("d-flex", "align-items-center", "pt-2")}>
              <div className={cx("icon")}>
                <FontAwesomeIcon icon={faUserGroup} />
              </div>
              {groupUser?.length} thành viên
            </div>
            <div className={cx("d-flex", "justify-content-between", "pt-2")}>
              <div className={cx("d-flex", "align-items-center")}>
                <div className={cx("icon")}>
                  <FontAwesomeIcon icon={faLink} />
                </div>
                <div>
                  Link tham gia nhóm
                  <div>
                    <a href={groupLink}>{groupLink}</a>
                  </div>
                </div>
              </div>
              <div
                className={cx(
                  "d-flex",
                  "align-items-center",
                  "justify-content-around"
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
                  <FontAwesomeIcon icon={faCopy} />
                </AppButton>
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
                  <FontAwesomeIcon icon={faShare} />
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AsideBody;