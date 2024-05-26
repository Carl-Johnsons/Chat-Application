import style from "./ErrorMessage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  visible?: boolean;
  children?: React.ReactNode;
}

const ErrorMessage = ({ visible = false, children = "Default" }: Props) => {
  return (
    <div
      className={cx(
        "err-msg",
        "pt-1",
        "pb-1",
        visible ? "visible" : "invisible"
      )}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
