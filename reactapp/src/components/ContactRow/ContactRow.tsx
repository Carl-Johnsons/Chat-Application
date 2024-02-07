import AppButton from "../AppButton";
import Avatar from "../Avatar";
import style from "./ContactRow.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
interface Props {
  image: string;
  name: string;
}
const ContactRow = ({ image, name }: Props) => {
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
            src={image}
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
            {name}
          </div>
        </div>
      </div>
      <div className={cx("btn-container", "d-flex")}>
        <AppButton
          variant="app-btn-primary-transparent"
          className={cx(
            "btn btn-detail",
            "d-flex",
            "align-items-center",
            "fw-bold"
          )}
        >
          ...
        </AppButton>
        <AppButton
          variant="app-btn-primary-transparent"
          className={cx(
            "btn-delete-friend",
            "d-flex",
            "align-items-center",
            "fw-bold"
          )}
        >
          X
        </AppButton>
      </div>
    </div>
  );
};

export default ContactRow;
