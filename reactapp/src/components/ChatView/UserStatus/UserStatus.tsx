import { ConversationType } from "@/models";
import style from "./UserStatus.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "@/hooks";
import { useGetConversationUsersByConversationId } from "@/hooks/queries/conversation";
import { useGetCurrentUser } from "@/hooks/queries/user";
import { useMemo } from "react";
const cx = classNames.bind(style);

interface Props {
  type: ConversationType;
}

const UserStatus = ({ type }: Props) => {
  const [activeConversationId] = useGlobalState("activeConversationId");
  const [userIdsOnlineList] = useGlobalState("userIdsOnlineList");

  const { data: currentUserData } = useGetCurrentUser();
  const { data: conversationUserData, isLoading: isLoadingConversationUser } =
    useGetConversationUsersByConversationId(activeConversationId);
  const { data: conversationUsersData } =
    useGetConversationUsersByConversationId(activeConversationId);
  const isGroup = type === "Group";

  const otherUserId = useMemo(() => {
    if (!isGroup && conversationUsersData?.length) {
      return conversationUsersData[0].userId == currentUserData?.userId
        ? conversationUsersData[1].userId
        : conversationUsersData[0].userId;
    }
    return null;
  }, [conversationUsersData, currentUserData?.userId, isGroup]);

  const isLoading = isLoadingConversationUser;

  const isOnline =
    !isGroup && otherUserId && userIdsOnlineList.includes(otherUserId);
  return (
    <div className={cx("user-status")}>
      {!isGroup && (
        <span
          className={cx("status-dots", "me-2", isOnline ? "online" : "offline")}
        ></span>
      )}
      {isLoading
        ? "Loading...."
        : isGroup
        ? `${conversationUserData?.length} thành viên`
        : isOnline
        ? "Online"
        : "Offline"}
    </div>
  );
};

export default UserStatus;
