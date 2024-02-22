import Avatar from "@/components/shared/Avatar";

import style from "./MenuContact.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
interface Props {
  index?: number;
  image: string;
  name: string;
  isActive?: boolean;
  onClick?: (index: number) => void;
}

const MenuContact = ({
  index = 0,
  image,
  name,
  isActive,
  onClick = () => {},
}: Props) => {
  return (
    <div
      className={cx(
        "menu-contact-item",
        "w-100",
        "position-relative",
        "d-flex",
        isActive && "active"
      )}
      role="button"
      onClick={() => onClick(index)}
    >
      <div
        className={cx(
          "conversation-avatar",
          "d-flex",
          "align-items-center",
          "me-3"
        )}
      >
        <Avatar variant="avatar-img-20px" src={image} alt="menu contact icon" />
      </div>
      <div
        className={cx(
          "description",
          "flex-grow-1",
          "d-flex",
          "align-items-center"
        )}
      >
        <div className={cx("item-name-container", "position-relative")}>
          <div
            className={cx(
              "item-name",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0",
              "fw-medium"
            )}
          >
            {name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuContact;
