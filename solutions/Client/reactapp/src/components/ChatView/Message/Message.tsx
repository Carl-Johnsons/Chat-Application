import moment from "moment-timezone";
import { HTMLProps } from "react";

import style from "./Message.module.scss";
import classNames from "classnames/bind";
import { useGetUser } from "@/hooks/queries/user";

const cx = classNames.bind(style);
interface Props {
  message: {
    userId: string;
    content: string;
    createdAt: string;
  };
  showUsername?: boolean;
  sender?: boolean;
}
const Message: React.FC<Props & HTMLProps<HTMLDivElement>> = ({
  message,
  showUsername,
  sender,
  ...htmlProp
}) => {
  const mergeProp = Object.assign(htmlProp);
  const { userId, content, createdAt } = message;

  const { data } = useGetUser(userId);
  const tz = moment.tz.guess();
  const formattedTime = moment(new Date(createdAt)).tz(tz).format("HH:mm");
  return (
    <div
      className={cx("message", "mb-1", "text-break", sender && "sender")}
      {...mergeProp}
    >
      {showUsername && (
        <div className={cx("user-name", "mb-1")}>
          {data?.name ?? "Annonymous"}
        </div>
      )}
      <div className={cx("content", "mb-2")}>{content}</div>
      <div className={cx("time")}>{formattedTime}</div>
    </div>
  );
};

export default Message;
