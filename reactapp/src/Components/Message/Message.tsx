import style from "./Message.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
interface Props {
  name: string;
  content: string;
  time: string;
  showUsername?: boolean;
  sender?: boolean;
}
const Message = ({ name, content, time, showUsername, sender }: Props) => {
  return (
    <div className={cx("message", "mb-1", "text-break", sender && "sender")}>
      {showUsername && <div className={cx("user-name", "mb-1")}>{name}</div>}
      <div className={cx("content", "mb-2")}>{content}</div>
      <div className={cx("time")}>{time}</div>
    </div>
  );
};

export default Message;
