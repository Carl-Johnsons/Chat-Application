import React from "react";
import { Comment } from "models";

import style from "./AppComment.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";

const cx = classNames.bind(style);

interface Props {
  comment: Comment;
}

const AppComment = ({ comment }: Props) => {
  const { content } = comment;

  return (
    <div className={cx("comment", "mt-3", "d-flex")}>
      <div className={cx("user-avatar", "d-flex", "align-items-center")}>
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          variant="avatar-img-40px"
          src={images.defaultAvatarImg.src}
          alt="author avatar"
        ></Avatar>
      </div>
      <div
        className={cx(
          "comment-content",
          "rounded-3",
          "pt-2",
          "pb-2",
          "ps-2",
          "pe-2"
        )}
      >
        <div className={cx("author-name", "fw-medium")}>test user</div>
        <div className={cx("mb-2", "text-break")}>{content}</div>
      </div>
    </div>
  );
};

export { AppComment };
