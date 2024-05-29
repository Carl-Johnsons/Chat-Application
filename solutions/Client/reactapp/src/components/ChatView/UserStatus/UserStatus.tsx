import { ConversationType } from "@/models";
import style from "./UserStatus.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "@/hooks";
import { useGetMemberListByConversationId } from "@/hooks/queries/conversation";
import { useMemo } from "react";
import { useGetFriendList } from "hooks/queries/user/useGetFriendList.query";
import { useGetCurrentUser } from "hooks/queries/user/useGetCurrentUser.query";
const cx = classNames.bind(style);

interface Props {
  type: ConversationType;
}

const UserStatus = ({ type }: Props) => {
  const [activeConversationId] = useGlobalState("activeConversationId");
  const [userIdsOnlineList] = useGlobalState("userIdsOnlineList");

  const { data: conversationUserData, isLoading: isLoadingConversationUser } =
    useGetMemberListByConversationId(activeConversationId);

  const { data: currentUser } = useGetCurrentUser();

  const { data: conversationUsersData } =
    useGetMemberListByConversationId(activeConversationId);

  const { data: friendListData } = useGetFriendList();
  const friendIds = friendListData?.flatMap((f) => f.id);

  const isGroup = type === "GROUP";

  const otherUserId = useMemo(() => {
    if (!isGroup && conversationUsersData) {
      if (currentUser?.id === conversationUsersData[0].userId) {
        return conversationUsersData[1].userId;
      }
      return conversationUsersData[0].userId;
    }
    return null;
  }, [conversationUsersData, currentUser?.id, isGroup]);

  const isLoading = isLoadingConversationUser;

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
        : isStranger
        ? "Người lạ"
        : isGroup
        ? `${conversationUserData?.length ?? 0} thành viên`
        : isOnline
        ? "Online"
        : "Offline"}
    </div>
  );
};

export default UserStatus;
