import React, { useState } from "react";
import { AppComment } from "..";
import style from "./CommentContainer.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import {
  useCreateComment,
  useGetInfiniteCommentByPostId,
} from "@/hooks/queries/post";
import { useGetCurrentUser } from "@/hooks/queries/user";
import { AppInput } from "@/components/shared/AppInput";

const cx = classNames.bind(style);

interface Props {
  postId: string;
}

const CommentContainer = ({ postId }: Props) => {
  const [inputValue, setInputValue] = useState("");

  const { data: userData } = useGetCurrentUser();
  const { mutate: createCommentMutate } = useCreateComment();

  const {
    data: infiniteCL,
    fetchNextPage: fetchNextCL,
    hasNextPage: hasNextCL,
  } = useGetInfiniteCommentByPostId(
    { postId },
    {
      enabled: !!postId,
    }
  );

  const comments = infiniteCL?.pages.flatMap(
    (query) => query.data.paginatedData
  );

  return (
    <div className={cx("comment-container", "ps-3", "pe-3")}>
      <div className={cx("comment-input", "d-flex", "align-items-center")}>
        <div className={cx("current-user-avatar", "me-3")}>
          <Avatar
            avatarClassName={cx("rounded-circle")}
            src={userData?.avatarUrl ?? images.defaultAvatarImg.src}
            alt="current user avatar"
          />
        </div>
        <AppInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          wrapperClassName={cx("w-100")}
          className={cx("w-100", "rounded-2", "p-1", "form-control")}
          placeholder="Hãy nhập suy nghĩ của bạn"
          onTrigger={() => {
            createCommentMutate({ postId, content: inputValue });
          }}
        />
      </div>
      {(comments ?? []).map((comment, index) => {
        return <AppComment key={index} comment={comment} />;
      })}
      {hasNextCL && (
        <div className={cx("mt-2")}>
          <a
            href={"#" + postId}
            onClick={() => {
              fetchNextCL();
            }}
          >
            Xem thêm bình luận
          </a>
        </div>
      )}
    </div>
  );
};

export { CommentContainer };
