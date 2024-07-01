import { ConversationType } from "@/models";
import style from "./UserStatus.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "@/hooks";
import { useGetMemberListByConversationId } from "@/hooks/queries/conversation";
import { useGetFriendList } from "hooks/queries/user/useGetFriendList.query";
const cx = classNames.bind(style);

interface Props {
  type: ConversationType;
}

const UserStatus = ({ type }: Props) => {
  const [activeConversationId] = useGlobalState("activeConversationId");
  const [userIdsOnlineList] = useGlobalState("userIdsOnlineList");

  const { data: conversationUsersData, isLoading } =
    useGetMemberListByConversationId(
      { conversationId: activeConversationId, other: true },
      {
        enabled: !!activeConversationId,
      }
    );
  const { data: friendListData } = useGetFriendList();
  const friendIds = friendListData?.flatMap((f) => f.id);
  const isGroup = type === "GROUP";
  const otherUserId = conversationUsersData?.[0].userId;

  const isOnline =
    !isGroup && otherUserId && userIdsOnlineList.includes(otherUserId);
  const isStranger =
    otherUserId && friendListData && !friendIds?.includes(otherUserId);

  return (
    <div className={cx("user-status")}>
      {!isGroup && !isStranger && (
        <span
          className={cx("status-dots", "me-2", isOnline ? "online" : "offline")}
        ></span>
      )}
      {isLoading
        ? "Loading...."
        : isGroup
        ? `${conversationUsersData?.length ?? 0} thành viên`
        : isStranger
        ? "Người lạ"
        : isOnline
        ? "Online"
        : "Offline"}
    </div>
  );
};

export default UserStatus;
