import { Button } from "react-bootstrap";
import images from "../../assets";
import style from "./ProfileModalContent.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

interface Props {
  handleClickUpdate: () => void;
}

const ProfileModalContent = ({ handleClickUpdate }: Props) => {
  const username: string = "Javamismknownmformitsmportabilitymandmstrongmcomms";
  const gender: string = "Nam";
  const dob: string = "Ngày 01 tháng 01, 2000";
  const phone: string = "+84123456789";
  return (
    <>
      <div className={cx("background-img-container", "m-0")}>
        <img
          className={cx("w-100", "h-100", "object-fit-cover")}
          draggable="false"
          src={images.defaultBackgroundImg}
        />
      </div>
      <div className={cx("info-container", "d-flex")}>
        <div
          className={cx("w-25", "avatar-img-container", "position-relative")}
        >
          <img
            className={cx("avatar-icon", "position-absolute")}
            draggable="false"
            src={images.defaultAvatarImg}
          />
        </div>
        <div className={cx("user-name", "w-75")}>{username}</div>
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
        <Button
          variant="default"
          className={cx("modal-btn", "w-100", "fw-medium", "m-0")}
          onClick={handleClickUpdate}
        >
          Cập nhật
        </Button>
      </div>
    </>
  );
};

export default ProfileModalContent;
