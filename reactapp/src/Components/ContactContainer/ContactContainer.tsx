import ContactHeader from "../ContactHeader";

import images from "../../assets";
import style from "./ContactContainer.module.scss";
import classNames from "classnames/bind";
import Avatar from "../Avatar";
import AppButton from "../AppButton";
import { memo } from "react";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const img = images.userSolid;
  const name =
    "ShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShfShf";
  return (
    <>
      <div
        className={cx(
          "contact-page-header",
          "d-flex",
          "align-items-center",
          className
        )}
      >
        <ContactHeader image={img} name="Danh sách bạn bè" />
      </div>
      <div className={cx("contact-list-container")}>
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
                src={images.userIcon}
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
      </div>
    </>
  );
};

export default memo(ContactContainer);
