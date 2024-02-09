import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalState } from "../../globalState";
import AppButton from "../AppButton";
import Avatar from "../Avatar";
import style from "./ContactRow.module.scss";
import classNames from "classnames/bind";
import {
  faCheck,
  faClose,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { MenuContactIndex } from "../../data/constants";
const cx = classNames.bind(style);
interface Props {
  userId: number;
  onClickBtnAcceptFriendRequest?: (userId: number) => void;
  onClickBtnDetail?: (userId: number) => void;
  onClickBtnDelFriend?: (userId: number) => void;
  onClickBtnDelFriendRequest?: (userId: number) => void;
}
const ContactRow = ({
  userId,
  onClickBtnAcceptFriendRequest = () => {},
  onClickBtnDetail = () => {},
  onClickBtnDelFriend = () => {},
  onClickBtnDelFriendRequest = () => {},
}: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const [userMap] = useGlobalState("userMap");
  const currentUser = userMap.get(userId);
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
            src={currentUser?.avatarUrl ?? ""}
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
            {currentUser?.name ?? ""}
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
            onClick={() => onClickBtnAcceptFriendRequest(userId)}
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
          onClick={() => onClickBtnDetail(userId)}
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
              ? onClickBtnDelFriend(userId)
              : onClickBtnDelFriendRequest(userId)
          }
        >
          <FontAwesomeIcon icon={faClose} />
        </AppButton>
      </div>
    </div>
  );
};

export default ContactRow;
