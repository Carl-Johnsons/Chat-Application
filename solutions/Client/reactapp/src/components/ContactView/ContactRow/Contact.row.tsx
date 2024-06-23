import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faClose,
  faEllipsis,
  faBan,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import { useGlobalState } from "@/hooks";
import { MenuContactIndex } from "data/constants";

import style from "./Contact.row.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import { GroupConversation, User } from "@/models";
import { useGetUser } from "@/hooks/queries/user";
import { useGetConversation } from "@/hooks/queries/conversation";

const cx = classNames.bind(style);
interface Props {
  entityId: string;
  onClickBtnAcceptFriendRequest?: (userId: string) => void;
  onClickBtnDetail?: (userId: string) => void;
  onClickBtnDelFriend?: (userId: string) => void;
  onClickBtnDelFriendRequest?: (userId: string) => void;
  onClickBtnBlock?: (userId: string) => void;
  onClickBtnUnblock?: (userId: string) => void;
}
const ContactRow = ({
  entityId,
  onClickBtnAcceptFriendRequest = () => {},
  onClickBtnDetail = () => {},
  onClickBtnDelFriend = () => {},
  onClickBtnDelFriendRequest = () => {},
  onClickBtnBlock = () => {},
  onClickBtnUnblock = () => {},
}: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const isGroup = activeContactType === MenuContactIndex.GROUP_LIST;

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

  return (
    <div className={cx("contact-row", "d-flex", "justify-content-between")}>
      <div
        className={cx(
          "contact-info-container",
          "d-flex",
          "align-items-center",
          "p-2"
        )}>
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
            )}>
            {name ?? ""}
          </div>
        </div>
      </div>
      <div className={cx("btn-container", "d-flex")}>
        {activeContactType === MenuContactIndex.FRIEND_REQUEST_LIST && (
          <AppButton
            variant="app-btn-primary-transparent"
            className={cx(
              "btn btn-accept-friend-request",
              "d-flex",
              "align-items-center",
              "fw-bold"
            )}
            onClick={() => onClickBtnAcceptFriendRequest(entityId)}>
            <FontAwesomeIcon icon={faCheck} />
          </AppButton>
        )}

        <AppButton
          variant="app-btn-primary-transparent"
          className={cx(
            "btn btn-detail",
            "d-flex",
            "align-items-center",
            "fw-bold"
          )}
          onClick={() => onClickBtnDetail(entityId)}>
          <FontAwesomeIcon icon={faEllipsis} />
        </AppButton>
        <AppButton
          variant="app-btn-primary-transparent"
          className={cx(
            "btn-delete-friend",
            "d-flex",
            "align-items-center",
            "fw-bold"
          )}
          onClick={() =>
            activeContactType === MenuContactIndex.FRIEND_LIST
              ? onClickBtnDelFriend(entityId)
              : onClickBtnDelFriendRequest(entityId)
          }>
          <FontAwesomeIcon icon={faClose} />
        </AppButton>
        {(activeContactType === MenuContactIndex.USER_BLACK_LIST && (
          <AppButton
            variant="app-btn-primary-transparent"
            className={cx(
              "btn btn-accept-friend-request",
              "d-flex",
              "align-items-center",
              "fw-bold"
            )}
            onClick={() => {
              onClickBtnUnblock(entityId);
            }}>
            <FontAwesomeIcon icon={faUnlock} />
          </AppButton>
        )) || (
          <AppButton
            variant="app-btn-primary-transparent"
            className={cx(
              "btn btn-detail",
              "d-flex",
              "align-items-center",
              "fw-bold"
            )}
            onClick={() => onClickBtnBlock(entityId)}>
            <FontAwesomeIcon icon={faBan} />
          </AppButton>
        )}
      </div>
    </div>
  );
};

export default ContactRow;
