import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen } from "@fortawesome/free-solid-svg-icons";

import images from "../../assets";
import style from "./ProfileModalContent.module.scss";
import classNames from "classnames/bind";
import AppButton from "../AppButton";
import Avatar from "../Avatar";
import { useGlobalState } from "../../globalState";
import { convertISODateToVietnameseFormat } from "../../Utils/DateUtils";

const cx = classNames.bind(style);

type PersonalVariant = {
  type: "Personal";
  onClickUpdate?: () => void;
  onClickEditAvatar?: () => void;
  onClickEditUserName?: () => void;
};

type FriendVariant = {
  type: "Friend";
  onClickCalling?: () => void;
  onClickMessaging?: () => void;
};

type StrangerVariant = {
  type: "Stranger";
  onClickSendFriendRequest?: () => void;
  onClickMessaging?: () => void;
};

type Variants = PersonalVariant | FriendVariant | StrangerVariant;

const ProfileModalContent = (variant: Variants) => {
  const [modalUserId] = useGlobalState("modalUserId");
  const [userMap] = useGlobalState("userMap");
  const user = userMap.get(modalUserId);

  const username = user?.name;
  const gender = user?.gender;
  const dob = convertISODateToVietnameseFormat(user?.dob);
  const phone = user?.phoneNumber;
  const avatar = user?.avatarUrl;
  const background = user?.backgroundUrl;

  //Extract variable
  const type = variant.type;
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

  const isPersonal = type === "Personal";
  const isFriend = type === "Friend";

  if (isPersonal) {
    ({ onClickUpdate, onClickEditAvatar, onClickEditUserName } = variant);
  } else if (isFriend) {
    ({ onClickCalling, onClickMessaging } = variant);
  } else {
    ({ onClickSendFriendRequest, onClickMessaging } = variant);
  }

  return (
    <>
      <div className={cx("background-img-container", "m-0")}>
        <img
          className={cx("w-100", "h-100", "object-fit-cover")}
          draggable="false"
          src={background || images.defaultBackgroundImg}
        />
      </div>
      <div className={cx("info-container", "pb-2")}>
        <div className={cx("info-detail", "d-flex", !isPersonal && "pb-4")}>
          <div
            className={cx("w-25", "avatar-img-container", "position-relative")}
          >
            <Avatar
              variant="avatar-img-80px"
              className={cx("position-absolute", "rounded-circle")}
              src={avatar || images.defaultAvatarImg}
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
            <span className={cx("me-2")}> {username}</span>
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
              "pt-2"
            )}
          >
            <AppButton
              variant="app-btn-primary"
              className={cx("info-button", "fw-medium")}
              onClick={isFriend ? onClickCalling : onClickSendFriendRequest}
            >
              {isFriend ? "Gọi điện" : "Kết bạn"}
            </AppButton>
            <AppButton
              variant="app-btn-tertiary"
              className={cx("info-button", "fw-medium")}
              onClick={onClickMessaging}
            >
              Nhắn tin
            </AppButton>
          </div>
        )}
      </div>

      <div className={cx("container-divider", "ms-0", "me-0")}></div>

      <div
        className={cx(
          "personal-information-container",
          "d-flex",
          "flex-column"
        )}
      >
        <div className={cx("personal-information-row")}>Thông tin cá nhân</div>

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

      <div className={cx("footer", "mb-3")}>
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
    </>
  );
};

export default ProfileModalContent;
