import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./AppTag.module.scss";
import classNames from "classnames/bind";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import AppButton from "../AppButton";

const cx = classNames.bind(style);

interface Props {
  className?: string;
  value: string;
  onClickCancel?: () => void;
}

const AppTag = ({ className = "", value, onClickCancel = () => {} }: Props) => {
  return (
    <div className={cx("tag", "enable-cancel", "d-flex", className)}>
      <div className={cx("d-flex", "align-items-center")}>{value}</div>
      <AppButton onClick={onClickCancel} className={cx("cancel-btn", "ms-2")}>
        <FontAwesomeIcon icon={faClose} />
      </AppButton>
    </div>
  );
};

export { AppTag };
