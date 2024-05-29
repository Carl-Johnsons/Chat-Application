import { Comment } from "models";
import React from "react";
import { AppComment } from "..";
import style from "./CommentContainer.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  comments: Comment[];
}

const CommentContainer = ({ comments }: Props) => {
  return (
    <div className={cx("comment-container", "ps-3", "pe-3")}>
      {comments.map((comment, index) => {
        return <AppComment key={index} comment={comment} />;
      })}
    </div>
  );
};

export { CommentContainer };
