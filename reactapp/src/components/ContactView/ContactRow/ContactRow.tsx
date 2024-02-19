import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalState } from "../../../globalState";
import AppButton from "../../shared/AppButton";
import Avatar from "../../shared/Avatar";
import style from "./ContactRow.module.scss";
import classNames from "classnames/bind";
import {
  faCheck,
  faClose,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { MenuContactIndex } from "../../../data/constants";
import { Group, User } from "../../../models";
const cx = classNames.bind(style);
interface Props {
  entityId: number;
  onClickBtnAcceptFriendRequest?: (userId: number) => void;
  onClickBtnDetail?: (userId: number) => void;
  onClickBtnDelFriend?: (userId: number) => void;
  onClickBtnDelFriendRequest?: (userId: number) => void;
}
const ContactRow = ({
  entityId,
  onClickBtnAcceptFriendRequest = () => {},
  onClickBtnDetail = () => {},
  onClickBtnDelFriend = () => {},
  onClickBtnDelFriendRequest = () => {},
}: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const currentEntity =
    activeContactType === MenuContactIndex.GROUP_LIST
      ? groupMap.get(entityId)
      : userMap.get(entityId);

  const avatar =
    (currentEntity as User)?.avatarUrl ??
    (currentEntity as Group)?.groupAvatarUrl;

  const name =
    (currentEntity as User)?.name ?? (currentEntity as Group)?.groupName;
  return (
    <div className={cx("contact-row", "d-flex", "justify-content-between")}>
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
            className={cx("rounded-circle")}
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
        {activeContactType === MenuContactIndex.FRIEND_REQUEST_LIST && (
          <AppButton
            variant="app-btn-primary-transparent"
            className={cx(
              "btn btn-accept-friend-request",
              "d-flex",
              "align-items-center",
              "fw-bold"
            )}
            onClick={() => onClickBtnAcceptFriendRequest(entityId)}
          >
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
          onClick={() => onClickBtnDetail(entityId)}
        >
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
          }
        >
          <FontAwesomeIcon icon={faClose} />
        </AppButton>
      </div>
    </div>
  );
};

export default ContactRow;
