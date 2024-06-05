import { Comment } from "models";
import React from "react";
import { AppComment } from "..";
import style from "./CommentContainer.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import { useGetCurrentUser } from "hooks/queries/user/useGetCurrentUser.query";
import images from "@/assets";

const cx = classNames.bind(style);

interface Props {
  comments: Comment[];
}

const CommentContainer = ({ comments }: Props) => {
  const { data: userData } = useGetCurrentUser();
  return (
    <div className={cx("comment-container", "ps-3", "pe-3")}>
      <div className={cx("comment-input", "d-flex")}>
        <div className={cx("current-user-avatar", "me-3")}>
          <Avatar
            avatarClassName={cx("rounded-circle")}
            src={userData?.avatarUrl ?? images.defaultAvatarImg.src}
            alt="current user avatar"
          />
        </div>
        <input className={cx("w-100", "rounded-2", "p-1", "form-control")} placeholder="Hãy nhập suy nghĩ của bạn"/>
      </div>
      {comments.map((comment, index) => {
        return <AppComment key={index} comment={comment} />;
      })}
    </div>
  );
};

export { CommentContainer };