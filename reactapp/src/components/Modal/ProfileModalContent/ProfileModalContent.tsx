import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faEllipsis, faPen } from "@fortawesome/free-solid-svg-icons";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";

import { useGlobalState } from "@/hooks";

import { convertISODateToVietnameseFormat } from "@/utils";
import { Group, User } from "@/models";

import style from "./ProfileModalContent.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";

const cx = classNames.bind(style);

type BaseVariant = {
  modalEntityId: number;
};

type PersonalVariant = BaseVariant & {
  type: "Personal";
  onClickUpdate?: () => void;
  onClickEditAvatar?: () => void;
  onClickEditUserName?: () => void;
};

type FriendVariant = BaseVariant & {
  type: "Friend";
  onClickCalling?: () => void;
  onClickMessaging?: () => void;
};

type StrangerVariant = BaseVariant & {
  type: "Stranger";
  onClickSendFriendRequest?: () => void;
  onClickMessaging?: () => void;
};
type GroupVariant = BaseVariant & {
  type: "Group";
  onClickMoreMemberInfo?: () => void;
  onClickMessaging?: () => void;
};

type Variants =
  | PersonalVariant
  | FriendVariant
  | StrangerVariant
  | GroupVariant;

const ProfileModalContent = (variant: Variants) => {
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const [groupUserMap] = useGlobalState("groupUserMap");

  //Extract variable
  const type = variant.type;
  //Base variable
  const modalEntityId = variant.modalEntityId;
  //Personal
  let onClickUpdate: (() => void) | undefined;
  let onClickEditAvatar: (() => void) | undefined;
  let onClickEditUserName: (() => void) | undefined;
  //Friend
  let onClickCalling: (() => void) | undefined;
  //Stranger
  let onClickSendFriendRequest: (() => void) | undefined;
  //Friend & Stranger
  let onClickMessaging: (() => void) | undefined;
  //Group
  let onClickMoreMemberInfo: (() => void) | undefined;

  const isPersonal = type === "Personal";
  const isFriend = type === "Friend";
  const isStranger = type === "Stranger";
  const isGroup = type === "Group";

  if (isPersonal) {
    ({ onClickUpdate, onClickEditAvatar, onClickEditUserName } = variant);
  } else if (isFriend) {
    ({ onClickCalling, onClickMessaging } = variant);
  } else if (isStranger) {
    ({ onClickSendFriendRequest, onClickMessaging } = variant);
  } else {
    ({ onClickMessaging, onClickMoreMemberInfo } = variant);
  }
  const entity = !isGroup
    ? userMap.get(modalEntityId)
    : groupMap.get(modalEntityId);

  const userIdList = isGroup ? groupUserMap.get(modalEntityId) : undefined;

  const name = (entity as User)?.name ?? (entity as Group)?.groupName;
  const gender = (entity as User)?.gender;
  const dob = convertISODateToVietnameseFormat((entity as User)?.dob);
  const phone = (entity as User)?.phoneNumber;
  const avatar =
    (entity as User)?.avatarUrl ?? (entity as Group)?.groupAvatarUrl;
  const background = (entity as User)?.backgroundUrl;

  return (
    <div className={cx("profile-modal-content", "m-0")}>
      {!isGroup && (
        <div className={cx("background-img-container", "m-0")}>
          <img
            className={cx("w-100", "h-100", "object-fit-cover")}
            draggable="false"
            src={background || images.defaultBackgroundImg.src}
          />
        </div>
      )}
      <div
        className={cx(
          "info-container",
          "ps-3",
          "pe-3",
          isPersonal ? "pb-4" : "pb-2"
        )}
      >
        <div
          className={cx(
            "info-detail",
            "d-flex",
            !isGroup ? "individual" : "pb-4"
          )}
        >
          <div
            className={cx("w-25", "avatar-img-container", "position-relative")}
          >
            <Avatar
              variant="avatar-img-80px"
              className={cx("rounded-circle")}
              src={avatar || images.defaultAvatarImg.src}
              alt="avatar image"
            />
            {/* Only personal can edit their avatar */}
            {isPersonal && (
              <AppButton
                className={cx(
                  "avatar-edit-btn",
                  "rounded-circle",
                  "p-0",
                  "position-absolute",
                  "d-inline-flex",
                  "justify-content-center",
                  "align-items-center"
                )}
                onClick={onClickEditAvatar}
              >
                <FontAwesomeIcon icon={faCamera} />
              </AppButton>
            )}
            {/* Only personal can edit their avatar */}
          </div>
          <div className={cx("user-name", "position-relative", "w-75")}>
            <span className={cx("me-2")}> {name}</span>
            <AppButton
              variant="app-btn-primary-transparent"
              className={cx(
                "username-edit-btn",
                "p-0",
                "rounded-circle",
                "position-absolute",
                "d-inline-flex",
                "justify-content-center",
                "align-items-center"
              )}
              onClick={onClickEditUserName}
            >
              <FontAwesomeIcon icon={faPen} />
            </AppButton>
          </div>
        </div>
        {/* Type friend and stranger has multiple button to function */}
        {!isPersonal && (
          <div
            className={cx(
              "info-button-container",
              "d-flex",
              "justify-content-between",
              !isGroup && "pt-5"
            )}
          >
            {!isGroup && (
              <AppButton
                variant="app-btn-primary"
                className={cx("info-button", "fw-medium", "flex-grow-1")}
                onClick={isFriend ? onClickCalling : onClickSendFriendRequest}
              >
                {isFriend ? "Gọi điện" : "Kết bạn"}
              </AppButton>
            )}

            <AppButton
              variant="app-btn-tertiary"
              className={cx("info-button", "fw-medium", "flex-grow-1")}
              onClick={onClickMessaging}
            >
              Nhắn tin
            </AppButton>
          </div>
        )}
      </div>

      <div className={cx("container-divider", "ms-0", "me-0")}></div>
      {/* Individual information */}
      {!isGroup && (
        <div
          className={cx(
            "personal-information-container",
            "d-flex",
            "flex-column",
            "ps-3",
            "pe-3"
          )}
        >
          <div className={cx("personal-information-row")}>
            Thông tin cá nhân
          </div>

          <div className={cx("personal-information-row")}>
            <div className={cx("row-name")}>Giới tính</div>
            <div className={cx("row-detail")}>{gender}</div>
          </div>

          <div className={cx("personal-information-row")}>
            <div className={cx("row-name")}>Ngày sinh</div>
            <div className={cx("row-detail")}>{dob}</div>
          </div>
          <div className={cx("personal-information-row")}>
            <div className={cx("row-name")}>Điện thoại</div>
            <div className={cx("row-detail")}>{phone}</div>
          </div>
          <div className={cx("note")}>
            Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
          </div>
        </div>
      )}
      {/* Group information */}
      {isGroup && (
        <div
          className={cx(
            "personal-information-container",
            "d-flex",
            "flex-column",
            "ps-3",
            "pe-3"
          )}
        >
          <div className={cx("personal-information-row")}>
            Thành viên &#40;{userIdList?.length}&#41;
          </div>

          <div className={cx("member-avatar-container")}>
            {userIdList?.map((userId, index) => {
              if (index >= 4) {
                return;
              }
              const member = userMap.get(userId);
              const avatar = member?.avatarUrl ?? images.userIcon.src;
              return (
                <Avatar
                  key={userId}
                  variant="avatar-img-40px"
                  src={avatar}
                  className={cx(
                    "border",
                    "border-light",
                    "rounded-circle",
                    index === 0 && "first-avatar"
                  )}
                  alt="user avatar"
                />
              );
            })}
            <AppButton
              variant="app-btn-primary"
              className={cx("more-member-info-btn", "p-0", "rounded-circle")}
              onClick={onClickMoreMemberInfo}
            >
              <FontAwesomeIcon
                className={cx("m-0")}
                icon={faEllipsis}
                width={40}
              />
            </AppButton>
          </div>
        </div>
      )}
      {/* Footer */}
      <div className={cx("footer", "mb-3", "ps-3", "pe-3")}>
        <div className={cx("container-divider-2px", "ms-0", "me-0")}></div>

        {isPersonal && (
          <AppButton
            variant="app-btn-primary-transparent"
            onClick={onClickUpdate}
            className={cx("w-100", "fw-medium")}
          >
            <FontAwesomeIcon icon={faPen} className="me-2" />
            Cập nhật
          </AppButton>
        )}
      </div>
    </div>
  );
};

export default ProfileModalContent;
