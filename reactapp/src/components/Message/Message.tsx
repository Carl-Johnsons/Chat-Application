import { useEffect } from "react";
import { useGlobalState } from "../../globalState";
import style from "./Message.module.scss";
import classNames from "classnames/bind";
import { getUser } from "../../services/user";

const cx = classNames.bind(style);
interface Props {
  userId: number;
  content: string;
  time: string;
  showUsername?: boolean;
  sender?: boolean;
}
const Message = ({ userId, content, time, showUsername, sender }: Props) => {
  const [userMap, setUserMap] = useGlobalState("userMap");
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
    <div className={cx("message", "mb-1", "text-break", sender && "sender")}>
      {showUsername && (
        <div className={cx("user-name", "mb-1")}>
          {user?.name ?? "Annonymous"}
        </div>
      )}
      <div className={cx("content", "mb-2")}>{content}</div>
      <div className={cx("time")}>{time}</div>
    </div>
  );
};

export default Message;
