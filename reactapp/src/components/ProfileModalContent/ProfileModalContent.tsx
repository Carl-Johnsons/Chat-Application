import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen } from "@fortawesome/free-solid-svg-icons";

import images from "../../assets";
import style from "./ProfileModalContent.module.scss";
import classNames from "classnames/bind";
import AppButton from "../AppButton";
import Avatar from "../Avatar";
import { useGlobalState } from "../../globalState";
import { convertISODateToVietnameseFormat } from "../../utils/DateUtils";
import { Group, User } from "../../models";
import { useEffect } from "react";
import { getUser } from "../../services/user";

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
type GroupVariant = {
  type: "Group";
  onClickMessaging?: () => void;
};

type Variants =
  | PersonalVariant
  | FriendVariant
  | StrangerVariant
  | GroupVariant;

const ProfileModalContent = (variant: Variants) => {
  const [modalEntityId] = useGlobalState("modalEntityId");
  const [messageType] = useGlobalState("messageType");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const [groupUserMap] = useGlobalState("groupUserMap");

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
  const isStranger = type === "Stranger";
  const isGroup = messageType === "Group";

  if (isPersonal) {
    ({ onClickUpdate, onClickEditAvatar, onClickEditUserName } = variant);
  } else if (isFriend) {
    ({ onClickCalling, onClickMessaging } = variant);
  } else if (isStranger) {
    ({ onClickSendFriendRequest, onClickMessaging } = variant);
  } else {
    ({ onClickMessaging } = variant);
  }
  const entity =
    messageType === "Individual"
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

  // Map unknown user in the group
  useEffect(() => {
    const fetchUserInGroup = async () => {
      let isFetched = false;
      if (!userIdList) {
        return;
      }
      const newUserMap = new Map(userMap);
      for (const memberId of userIdList) {
        if (newUserMap.has(memberId)) {
          continue;
        }
        const [member] = await getUser(memberId);
        if (!member) {
          continue;
        }
        isFetched = true;
        newUserMap.set(member.userId, member);
      }
      isFetched && setUserMap(newUserMap);
    };
    fetchUserInGroup();
  }, [setUserMap, userIdList, userMap]);

  return (
    <>
      {!isGroup && (
        <div className={cx("background-img-container", "m-0")}>
          <img
            className={cx("w-100", "h-100", "object-fit-cover")}
            draggable="false"
            src={background || images.defaultBackgroundImg}
          />
        </div>
      )}
      <div className={cx("info-container", isPersonal ? "pb-4" : "pb-2")}>
        <div
          className={cx(
            "info-detail",
            "d-flex",
            !isPersonal && "pb-4",
            messageType === "Individual" && "individual"
          )}
        >
          <div
            className={cx("w-25", "avatar-img-container", "position-relative")}
          >
            <Avatar
              variant="avatar-img-80px"
              className={cx("rounded-circle")}
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
              "pt-2"
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
            "flex-column"
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
            "flex-column"
          )}
        >
          <div className={cx("personal-information-row")}>
            Thành viên &#40;{userIdList?.length}&#41;
          </div>

          <div className={cx("member-avatar-container")}>
            {userIdList?.map((userId, index) => {
              const member = userMap.get(userId);
              const avatar = member?.avatarUrl ?? images.userIcon;
              return (
                <Avatar
                  key={userId}
                  variant="avatar-img-40px"
                  src={avatar}
                  className={cx(
                    "rounded-circle",
                    index === 0 && "first-avatar"
                  )}
                  alt="user avatar"
                />
              );
            })}
          </div>
        </div>
      )}
      {/* Footer */}
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
