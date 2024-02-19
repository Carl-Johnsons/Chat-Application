import Avatar from "../../shared/Avatar";

import style from "./ContactHeader.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
interface Props {
  image: string;
  name: string;
}

const ContactHeader = ({ image, name }: Props) => {
  return (
    <>
      <div className={cx("avatar-container", "p-4")}>
        <Avatar variant="avatar-img-20px" src={image} alt="header icon" />
      </div>
      <div
        className={cx("header-name-container", "w-100", "position-relative")}
      >
        <div
          className={cx(
            "header-name",
            "text-truncate",
            "position-absolute",
            "start-0",
            "top-0",
            "end-0",
            "bottom-0"
          )}
        >
          {name}
        </div>
      </div>
    </>
  );
};

export default ContactHeader;
