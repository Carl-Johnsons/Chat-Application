import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faEllipsis,
  faBan,
  faUnlock,
  faUserSlash,
} from "@fortawesome/free-solid-svg-icons";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";

import style from "./Contact.row.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import { GroupConversation, User } from "@/models";
import { useGetUser } from "@/hooks/queries/user";
import { useGetConversation } from "@/hooks/queries/conversation";

const cx = classNames.bind(style);

type BaseVariant = {
  entityId: string;
  className?: string;
};

type UserManagementVariant = BaseVariant & {
  type: "UserManagement";
  onClickBtnDetail?: (userId: string) => void;
  onClickDisableUser?: () => void;
  onClickEnableUser?: () => void;
};

type UserVariant = BaseVariant & {
  type: "User";
  onClickBtnDetail?: (userId: string) => void;
  onClickBtnDelFriend?: (userId: string) => void;
  onClickBtnBlock?: (userId: string) => void;
};

type GroupVariant = BaseVariant & {
  type: "Group";
  onClickBtnDetail?: (groupId: string) => void;
};

type UserBlockVariant = BaseVariant & {
  type: "UserBlock";
  onClickBtnDetail?: (userId: string) => void;
  onClickBtnUnblock?: (unblockUserId: string) => void;
};

type FriendRequestVariant = BaseVariant & {
  type: "FriendRequest";
  onClickBtnDetail?: (userId: string) => void;
  onClickBtnAcceptFriendRequest?: (userId: string) => void;
  onClickBtnDelFriendRequest?: (userId: string) => void;
  onClickBtnBlock?: (userId: string) => void;
};

type Variant =
  | UserVariant
  | GroupVariant
  | UserBlockVariant
  | FriendRequestVariant
  | UserManagementVariant;

const ContactRow = (variant: Variant) => {
  //Extract type
  const { className, type } = variant;
  const entityId: string = variant.entityId;
  let onClickBtnAcceptFriendRequest: ((entityId: string) => void) | undefined;
  let onClickBtnDetail: ((entityId: string) => void) | undefined;
  let onClickBtnDelFriend: ((entityId: string) => void) | undefined;
  let onClickBtnDelFriendRequest: ((entityId: string) => void) | undefined;
  let onClickBtnBlock: ((entityId: string) => void) | undefined;
  let onClickBtnUnblock: ((entityId: string) => void) | undefined;
  let onClickDisableUser: (() => void) | undefined;
  let onClickEnableUser: (() => void) | undefined;

  const isUser = type === "User";
  const isGroup = type === "Group";
  const isUserBlock = type === "UserBlock";
  const isFriendRequest = type === "FriendRequest";
  const isUserManagement = type === "UserManagement";

  if (isUser) {
    ({ onClickBtnDetail, onClickBtnDelFriend, onClickBtnBlock } = variant);
  } else if (isGroup) {
    ({ onClickBtnDetail } = variant);
  } else if (isUserBlock) {
    ({ onClickBtnDetail, onClickBtnUnblock } = variant);
  } else if (isFriendRequest) {
    ({
      onClickBtnDetail,
      onClickBtnAcceptFriendRequest,
      onClickBtnBlock,
      onClickBtnDelFriendRequest,
    } = variant);
  } else {
    ({ onClickBtnDetail, onClickEnableUser, onClickDisableUser } = variant);
  }

  const { data: userData } = useGetUser(entityId, {
    enabled: !isGroup && !!entityId,
  });

  const { data: conversationData } = useGetConversation(
    {
      conversationId: entityId,
    },
    {
      enabled: isGroup && !!entityId,
    }
  );

  const entityData = isGroup ? conversationData : userData;

  const avatar =
    (isGroup
      ? (entityData as GroupConversation)?.imageURL
      : (entityData as User)?.avatarUrl) ?? images.userIcon.src;

  const name =
    (isGroup
      ? (entityData as GroupConversation)?.name
      : (entityData as User)?.name) ?? "";

  const buttons = [
    {
      condition: isFriendRequest && onClickBtnAcceptFriendRequest,
      onClick: () => onClickBtnAcceptFriendRequest!(entityId),
      icon: faCheck,
      className: "btn-accept-friend-request",
    },
    {
      condition: onClickBtnDetail,
      onClick: () => onClickBtnDetail!(entityId),
      icon: faEllipsis,
      className: "btn-detail",
    },
    {
      condition:
        (isFriendRequest || isUser) &&
        (onClickBtnDelFriendRequest || onClickBtnDelFriend),
      onClick: () =>
        isFriendRequest
          ? onClickBtnDelFriendRequest!(entityId)
          : onClickBtnDelFriend!(entityId),
      icon: faClose,
      className: "btn-delete-friend",
    },
    {
      condition: isUserBlock && onClickBtnUnblock,
      onClick: () => onClickBtnUnblock!(entityId),
      icon: faUnlock,
      className: "btn-unblock-user",
    },
    {
      condition: (isUser || isFriendRequest) && onClickBtnBlock,
      onClick: () => onClickBtnBlock!(entityId),
      icon: faBan,
      className: "btn-block-user",
    },
    {
      condition: isUserManagement && userData?.active && onClickDisableUser,
      onClick: () => onClickDisableUser!(),
      icon: faUserSlash,
      className: "btn-disable-user",
    },
    {
      condition: isUserManagement && !userData?.active && onClickEnableUser,
      onClick: () => onClickEnableUser!(),
      icon: faUnlock,
      className: "btn-enable-user",
    },
  ];

  return (
    <div
      className={cx(
        "contact-row",
        "d-flex",
        "justify-content-between",
        className
      )}
    >
      <div
        className={cx(
          "contact-info-container",
          "d-flex",
          "align-items-center",
          "p-2"
        )}
      >
        <div className={cx("avatar-container")}>
          <Avatar
            variant="avatar-img-40px"
            avatarClassName={cx("rounded-circle")}
            src={avatar ?? ""}
            alt="user icon"
          />
        </div>
        <div className={cx("user-name-container", "position-relative")}>
          <div
            className={cx(
              "user-name",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {name ?? ""}
          </div>
        </div>
      </div>
      <div className={cx("btn-container", "d-flex")}>
        {buttons
          .filter((button) => button.condition)
          .map((button, index) => (
            <AppButton
              key={index}
              variant="app-btn-primary-transparent"
              className={cx(
                button.className,
                "d-flex",
                "align-items-center",
                "fw-bold"
              )}
              onClick={button.onClick}
            >
              <FontAwesomeIcon icon={button.icon} />
            </AppButton>
          ))}
      </div>
    </div>
  );
};

export default ContactRow;
