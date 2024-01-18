import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen } from "@fortawesome/free-solid-svg-icons";

import images from "../../assets";
import style from "./ProfileModalContent.module.scss";
import classNames from "classnames/bind";
import AppButton from "../AppButton";
import Avatar from "../Avatar";
import { useGlobalState } from "../../GlobalState";

const cx = classNames.bind(style);

interface Props {
  onClickUpdate?: () => void;
  onClickEditAvatar?: () => void;
  onClickEditUserName?: () => void;
}

const ProfileModalContent = ({
  onClickUpdate = () => {},
  onClickEditAvatar = () => {},
  onClickEditUserName = () => {},
}: Props) => {
  const [user] = useGlobalState("user");
  const username = user.name;
  const gender = user.gender;
  const dob = user.dob;
  const phone = user.phoneNumber;
  const avatar = user.avatarUrl;
  const background = user.backgroundUrl;
  return (
    <>
      <div className={cx("background-img-container", "m-0")}>
        <img
          className={cx("w-100", "h-100", "object-fit-cover")}
          draggable="false"
          src={background || images.defaultBackgroundImg}
        />
      </div>
      <div className={cx("info-container", "d-flex")}>
        <div
          className={cx("w-25", "avatar-img-container", "position-relative")}
        >
          <Avatar
            variant="avatar-img-80px"
            className={cx("position-absolute", "rounded-circle")}
            src={avatar || images.defaultAvatarImg}
            alt="avatar image"
          />
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
        <AppButton
          variant="app-btn-primary-transparent"
          onClick={onClickUpdate}
          className={cx("w-100", "fw-medium")}
        >
          <FontAwesomeIcon icon={faPen} className="me-2" />
          Cập nhật
        </AppButton>
      </div>
    </>
  );
};

export default ProfileModalContent;
