import moment from "moment";
import { HTMLProps } from "react";

import style from "./Message.module.scss";
import classNames from "classnames/bind";
import { useGetUser } from "@/hooks/queries/user";

const cx = classNames.bind(style);
interface Props {
  message: {
    userId: number;
    content: string;
    time: string;
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
  const { userId, content, time } = message;

  const { data } = useGetUser(userId);

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
      <div className={cx("time")}>
        {moment(new Date(time)).format("HH:mm")} {time}
      </div>
    </div>
  );
};

export default Message;
