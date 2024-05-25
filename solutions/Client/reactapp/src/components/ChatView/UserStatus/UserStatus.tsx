import { ConversationType } from "@/models";
import style from "./UserStatus.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "@/hooks";
import { useGetMemberListByConversationId } from "@/hooks/queries/conversation";
import { useMemo } from "react";
const cx = classNames.bind(style);

interface Props {
  type: ConversationType;
}

const UserStatus = ({ type }: Props) => {
  const [activeConversationId] = useGlobalState("activeConversationId");
  const [userIdsOnlineList] = useGlobalState("userIdsOnlineList");

  const { data: conversationUserData, isLoading: isLoadingConversationUser } =
    useGetMemberListByConversationId(activeConversationId);
  const { data: conversationUsersData } =
    useGetMemberListByConversationId(activeConversationId);
  const isGroup = type === "GROUP";

  const otherUserId = useMemo(() => {
    if (!isGroup && conversationUsersData?.length) {
      return conversationUsersData[0].userId;
    }
    return null;
  }, [conversationUsersData, isGroup]);

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
        ? `${(conversationUserData?.length ?? -1) + 1} thành viên`
        : isOnline
        ? "Online"
        : "Offline"}
    </div>
  );
};

export default UserStatus;
