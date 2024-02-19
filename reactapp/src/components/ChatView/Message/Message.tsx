import { HTMLProps, useEffect } from "react";
import { useGlobalState } from "../../../globalState";
import style from "./Message.module.scss";
import classNames from "classnames/bind";
import { getUser } from "../../../services/user";
import moment from "moment";

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
  const [userMap, setUserMap] = useGlobalState("userMap");
  const { userId, content, time } = message;
  const user = userMap.get(userId);
  // Map unknown user in the group
  useEffect(() => {
    const fetchUserInGroup = async () => {
      if (user) {
        return;
      }
      const newUserMap = new Map(userMap);
      const [member] = await getUser(userId);
      if (!member) {
        return;
      }
      newUserMap.set(member.userId, member);
      setUserMap(newUserMap);
    };
    fetchUserInGroup();
  }, [setUserMap, user, userId, userMap]);
  return (
    <div
      className={cx("message", "mb-1", "text-break", sender && "sender")}
      {...mergeProp}
    >
      {showUsername && (
        <div className={cx("user-name", "mb-1")}>
          {user?.name ?? "Annonymous"}
        </div>
      )}
      <div className={cx("content", "mb-2")}>{content}</div>
      <div className={cx("time")}>{moment(new Date(time)).format("HH:mm")}</div>
    </div>
  );
};

export default Message;
