"use client";
import { useParams } from "next/navigation";
import style from "./page.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import {
  useGetGroupInvitationByInviteId,
  useJoinGroupConversation,
} from "@/hooks/queries/conversation";
import { formatRelativeFutureTime } from "utils/DateUtils";
import AppButton from "@/components/shared/AppButton";
import { roboto } from "app/fonts";
import { useCallback } from "react";

const cx = classNames.bind(style);

const JoinGroupConversationPage = () => {
  const params = useParams();
  const inviteId = params["invite-id"] as string;
  const { data: groupInvitationData } = useGetGroupInvitationByInviteId(
    { invitationId: inviteId },
    {
      enabled: !!inviteId,
    }
  );
  const { mutate: joinGroupConversationMutate } = useJoinGroupConversation();

  const group = groupInvitationData?.groupConversation;
  const isExpired = groupInvitationData?.isExpired ?? false;
  const avatar = group?.imageURL ?? images.defaultAvatarImg.src;
  const groupName = group?.name ?? "Loading..";
  const formattedExpireTime = groupInvitationData?.expiresAt
    ? formatRelativeFutureTime(groupInvitationData?.expiresAt)
    : "";

  const handleClickJoinGroupBtn = useCallback(() => {
    if (!groupInvitationData?.groupConversation) {
      return;
    }

    joinGroupConversationMutate({
      groupId: groupInvitationData?.groupConversation.id,
      invitationId: groupInvitationData?.id,
    });
  }, [groupInvitationData]);

  return (
    <div
      className={cx(
        "page",
        "w-100",
        "h-100",
        "d-flex",
        "justify-content-center",
        "align-items-center",
        roboto.className
      )}
    >
      <div
        className={cx(
          "group-invitation-container",
          "shadow-lg",
          "p-3",
          "text-white"
        )}
      >
        <div className={cx("fw-medium", "fs-5", "mb-3", "text-uppercase")}>
          Bạn được mời vào nhóm
        </div>
        <div className={cx("group-info", "d-flex", "align-items-center")}>
          <div className={cx("me-3")}>
            <Avatar
              src={avatar}
              alt="group avatar"
              avatarClassName={cx("rounded-circle", "object-fit-cover")}
            />
          </div>
          <div className={cx("me-3")}>
            <div className={cx("fw-bold")}>{groupName}</div>
            <div>
              {isExpired
                ? "Lời mời đã hết hạn"
                : `Lời mời còn tác dụng trong ${formattedExpireTime}`}
            </div>
          </div>
          <div>
            <AppButton
              variant="app-btn-success"
              onClick={handleClickJoinGroupBtn}
            >
              Tham gia
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupConversationPage;
