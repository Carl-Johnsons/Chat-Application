import React from "react";
import { Post } from "models/Post";

import style from "./AppPost.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import { CommentContainer, InteractionContainer } from "../";
import { AppDivider } from "@/components/shared";

const cx = classNames.bind(style);

interface Props {
  post: Post;
}

const AppPost = ({ post }: Props) => {
  const { interactions, comments, content } = post;
  return (
    <div
      className={cx(
        "post",
        "rounded-3",
        "shadow",
        "w-75",
        "flex-wrap",
        "mb-3",
        "p-3"
      )}
    >
      <div className={cx("author", "d-flex", "align-items-center")}>
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          variant="avatar-img-45px"
          src={images.defaultAvatarImg.src}
          alt="author avatar"
        ></Avatar>
        <div className={cx("author-name", "fw-medium")}>test user</div>
      </div>
      <div className={cx("ps-2", "pe-2", "text-break")}>{content}</div>
      <InteractionContainer
        className={cx("ps-2", "pe-2")}
        interactions={interactions}
      />
      <AppDivider />
      <CommentContainer comments={comments} />
    </div>
  );
};

export { AppPost };
