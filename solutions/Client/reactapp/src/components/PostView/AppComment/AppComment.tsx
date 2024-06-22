import React from "react";
import { Comment } from "models";

import style from "./AppComment.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import { useGetUser } from "hooks/queries/user/useGetUser.query";
import { formatRelativeTime } from "@/utils";

const cx = classNames.bind(style);

interface Props {
  comment: Comment;
}

const AppComment = ({ comment }: Props) => {
  const { userId, content, createdAt } = comment;
  const { data: userData } = useGetUser(userId, {
    enabled: !!userId,
  });

  const formattedTime = formatRelativeTime(createdAt);

  const userAvatar = userData?.avatarUrl ?? images.defaultAvatarImg.src;
  const userName = userData?.name ?? "Loading...";

  return (
    <div className={cx("comment", "mt-3", "d-flex")}>
      <div className={cx("user-avatar", "d-flex", "align-items-start")}>
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          variant="avatar-img-40px"
          src={userAvatar}
          alt="author avatar"
        ></Avatar>
      </div>
      <div>
        <div
          className={cx(
            "comment-content",
            "rounded-3",
            "pt-2",
            "pb-2",
            "ps-2",
            "pe-2",
            "shadow"
          )}
        >
          <div className={cx("author-name", "fw-medium")}>{userName}</div>
          <div className={cx("mb-2", "text-break")}>{content}</div>
        </div>
        <div className="">
          <div>{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

export { AppComment };
