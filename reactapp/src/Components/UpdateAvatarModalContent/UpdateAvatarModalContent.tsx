import AppButton from "../AppButton";
import style from "./UpdateAvatarModalContent.module.scss";
import classNames from "classnames/bind";
import images from "../../assets";
import Avatar from "../Avatar";
style;

const cx = classNames.bind(style);

const UpdateAvatarModalContent = () => {
  return (
    <>
      <div className={cx("mt-4", "mb-4")}>
        <AppButton
          variant="app-btn-tertiary"
          className={cx("w-100", "fw-medium")}
        >
          Tải lên từ máy tính
        </AppButton>
      </div>
      <div className={cx("fw-medium", "mb-3")}>Ảnh đại diện của tôi</div>
      <div>
        <ul className={cx("list-unstyled", "w-100", "mb-4")}>
          <li>
            <Avatar
              variant="avatar-img-lg"
              className={cx("rounded-circle")}
              src={images.defaultAvatarImg}
              alt="avatar image"
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default UpdateAvatarModalContent;
